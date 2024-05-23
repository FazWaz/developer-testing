"use client";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import { DollarIcon } from "@/components/Icons/Dollar";
import NumberInputField from "@/components/Forms/ClientInputs/NumberInputField";
interface PriceRangeDropdown {
  label?: string;
}

const PriceRangeDropdown: FC<PriceRangeDropdown> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const [minPrice, setMinPrice] = useState(
    params.get("price_range")?.split("-")[0] || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    params.get("price_range")?.split("-")[1] || ""
  );
  const [priceRange, setPriceRange] = useState(params.get("price_range") || "");
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClick(event: { target: any }) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdown}>
      <input type="hidden" name="price_range" value={priceRange} />
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <DollarIcon className="w-[25px] h-[25px]" />
        <span className="text-slate-400 xs:text-sm whitespace-nowrap">
          {priceRange ? priceRange : label || "Price"}
        </span>
      </div>
      <div
        className={`absolute transition-all overflow-hidden top-full bg-white z-10 shadow-sm border-slate-100 flex flex-col max-h-0 gap-2 p-4 ${
          isOpen ? "!p-2 !max-h-[20rem]" : "!p-0 !max-h-0"
        }`}
      >
        <div className="text-sm text-black cursor-pointer w-[140px] border p-2 border-solid border-slate-200">
          <NumberInputField
            placeholder="Min Price"
            className="w-full"
            onChange={(e: {
              preventDefault: any;
              target: { value: React.SetStateAction<string> };
            }) => {
              setMinPrice(e.target.value);
              if (+e.target.value <= parseInt(maxPrice)!) {
                setDisableBtn(false);
              } else {
                setDisableBtn(true);
              }
            }}
            value={minPrice}
            minLength={1}
            maxLength={5}
          />
        </div>
        <div className="text-sm text-black cursor-pointer w-[140px] border p-2 border-solid border-slate-200">
          <NumberInputField
            placeholder="Max Price"
            className="w-full"
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setMaxPrice(e.target.value);
              if (+e.target.value >= parseInt(minPrice)!) {
                setDisableBtn(false);
              } else {
                setDisableBtn(true);
              }
            }}
            value={maxPrice}
            minLength={1}
            maxLength={5}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              if (disableBtn) return;
              if (minPrice && maxPrice) {
                setPriceRange(minPrice + "-" + maxPrice);
              }
              setIsOpen(false);
            }}
            className={`py-2 w-full text-xs ${disableBtn ? "bg-slate-300" : "bg-primaryColor"}`}
          >
            Set
          </button>
          {priceRange && (
            <button
              type="button"
              onClick={() => {
                setPriceRange("");
                setMinPrice("");
                setMaxPrice("");
                setIsOpen(false);
              }}
              className="text-slate-500 w-full text-xs mt-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeDropdown;

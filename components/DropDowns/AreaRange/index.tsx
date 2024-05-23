"use client";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import NumberInputField from "@/components/Forms/ClientInputs/NumberInputField";
import { AreaIcon } from "@/components/Icons/Area";
interface AreaRangeDropdown {
  label?: string;
}

const AreaRangeDropdown: FC<AreaRangeDropdown> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString() || "");
  const [minArea, setMinArea] = useState(
    params.get("area_range")?.split("-")[0] || ""
  );
  const [maxArea, setMaxArea] = useState(
    params.get("area_range")?.split("-")[1] || ""
  );
  const [areaRange, setAreaRange] = useState(params.get("area_range") || "");
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
      <input type="hidden" name="area_range" value={areaRange} />
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <AreaIcon className="pr-1 w-[25px] h-[25px]" />
        <span className="text-slate-400 xs:text-sm whitespace-nowrap">
          {areaRange ? areaRange : label || "Area"}
        </span>
      </div>
      <div
        className={`absolute transition-all overflow-hidden top-full bg-white shadow-sm z-10 border-slate-100 flex flex-col max-h-0 gap-2 p-4 ${
          isOpen ? "!p-2 !max-h-[20rem]" : "!p-0 !max-h-0"
        }`}
      >
        <div className="text-sm text-black cursor-pointer w-[140px] border p-2 border-solid border-slate-200">
          <NumberInputField
            placeholder="Min Area (sqft)"
            name="minArea"
            className="w-full"
            onChange={(e: {
              preventDefault: any;
              target: { value: React.SetStateAction<string> };
            }) => {
              setMinArea(e.target.value);
              if (+e.target.value < parseInt(maxArea)!) {
                setDisableBtn(false);
              } else {
                setDisableBtn(true);
              }
            }}
            value={minArea}
            minLength={1}
            maxLength={5}
          />
        </div>
        <div className="text-sm text-black cursor-pointer w-[140px] border p-2 border-solid border-slate-200">
          <NumberInputField
            placeholder="Max Area (sqft)"
            name="maxArea"
            className="w-full"
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setMaxArea(e.target.value);
              if (+e.target.value >= parseInt(minArea)!) {
                setDisableBtn(false);
              } else {
                setDisableBtn(true);
              }
            }}
            value={maxArea}
            minLength={1}
            maxLength={5}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              if (disableBtn) return;
              if (minArea && maxArea) {
                setAreaRange(minArea + "-" + maxArea);
              }
              setIsOpen(false);
            }}
            className={`py-2 w-full text-xs ${disableBtn ? "bg-slate-300" : "bg-primaryColor"}`}
          >
            Set
          </button>
          {areaRange && (
            <button
              type="button"
              onClick={() => {
                setAreaRange("");
                setMinArea("");
                setMaxArea("");
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

export default AreaRangeDropdown;

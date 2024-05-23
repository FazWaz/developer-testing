"use client";
import { Sort } from "@/components/Icons/Sort";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
interface SortDropDownProps {}

const SortDropDown: FC<SortDropDownProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("");
  const dropdown = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());

  useEffect(() => {
    if (!isOpen) return;

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
    <div className="relative px-10" ref={dropdown}>
      <div
        className="flex gap-6 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Sort />
        <span className="text-black text-lg">Sort By</span>
      </div>
      <div
        className={`absolute transition-all overflow-hidden top-full bg-white flex flex-col w-[170px] shadow-md max-h-0 gap-2 ${
          isOpen ? "!p-2 !max-h-[20rem]" : "!p-0 !max-h-0"
        }`}
      >
        <h1
          className={`text-sm text-black cursor-pointer w-full py-2 px-2 ${sort == "pricelow" ? "bg-slate-100" : ""}`}
          onClick={() => {
            setIsOpen(false);
            setSort("pricelow");
            params.set("sort", "pricelow");

            router.push(pathname + "?" + params.toString());
          }}
        >
          Price Low to High
        </h1>
        <h1
          className={`text-sm text-black cursor-pointer w-full py-2 px-2 ${sort == "pricehigh" ? "bg-slate-100" : ""}`}
          onClick={() => {
            setIsOpen(false);
            setSort("pricehigh");
            params.set("sort", "pricehigh");
            router.push(pathname + "?" + params.toString());
          }}
        >
          Price High to Low
        </h1>
      </div>
    </div>
  );
};

export default SortDropDown;

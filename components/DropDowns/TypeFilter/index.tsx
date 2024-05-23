"use client";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { MenuIcon } from "@/components/Icons/Menu";
interface TypeDropdown {
  label?: string;
}

const TypeDropdown: FC<TypeDropdown> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams?.toString()),
    [searchParams]
  );
  const [type, setType] = useState(params.get("type") || "");

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
      <input type="hidden" name="type" value={type.toLowerCase()} />
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MenuIcon className="pr-1 w-[25px] h-[25px]" />
        <span className="text-slate-400 xs:text-sm whitespace-nowrap">
          {type ? type : label || "Type"}
        </span>
      </div>
      <div
        className={`absolute transition-all overflow-hidden top-full bg-white z-10 shadow-sm border-slate-100 flex flex-col max-h-0 gap-2 p-4 ${
          isOpen ? "!p-2 !max-h-[20rem]" : "!p-0 !max-h-0"
        }`}
      >
        <div
          onClick={() => {
            setType("Sale");
            setIsOpen(false);
          }}
          className={`text-sm text-slate-400 ${type == "Sale" ? "bg-slate-100" : ""} hover:bg-slate-100 cursor-pointer w-[100px] border p-2 border-solid border-slate-200`}
        >
          <h3 className="">Sale</h3>
        </div>
        <div
          onClick={() => {
            setType("Rent");
            setIsOpen(false);
          }}
          className={`text-sm text-slate-400 ${type == "Rent" ? "bg-slate-100" : ""} hover:bg-slate-100 cursor-pointer w-[100px] border p-2 border-solid border-slate-200`}
        >
          <h3>Rent</h3>
        </div>
        {type && (
          <div className="text-center">
            <span
              onClick={() => {
                setType("");
                setIsOpen(false);
              }}
              className="text-xs text-slate-500 cursor-pointer"
            >
              Clear
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeDropdown;

"use client";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import { PropertyTypes } from "@/constants/PropertyTypes";
import { HousesIcon } from "@/components/Icons/Houses";
interface PropertyTypeDropdown {
  label?: string;
}

const PropertyTypeDropdown: FC<PropertyTypeDropdown> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const [propertyType, setPropertyType] = useState(
    params.get("property_type") || ""
  );
  const propertyTypes = PropertyTypes;

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
      <input
        type="hidden"
        name="property_type"
        value={propertyType.toLowerCase()}
      />
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <HousesIcon className="pr-1 w-[25px] h-[25px]" />
        <span className="text-slate-400 xs:text-sm whitespace-nowrap">
          {propertyType
            ? propertyType[0].toUpperCase() +
              propertyType.toLocaleLowerCase().substring(1)
            : label || "All"}
        </span>
      </div>
      <div
        className={`absolute transition-all overflow-hidden top-full bg-white z-10 shadow-sm border-slate-100 flex flex-col max-h-0 gap-2 p-4 ${
          isOpen ? "!p-2 !max-h-[20rem]" : "!p-0 !max-h-0"
        }`}
      >
        {propertyTypes.map((item, key) => {
          return (
            <div
              key={key}
              onClick={() => {
                setPropertyType(item.toLowerCase());
                setIsOpen(false);
              }}
              className={`text-sm text-slate-400 ${propertyType == item.toLocaleLowerCase() ? "bg-slate-100" : ""} hover:bg-slate-100 cursor-pointer w-[150px] border p-2 border-solid border-slate-200`}
            >
              <h3 className="">
                {item[0].toUpperCase() + item.toLocaleLowerCase().substring(1)}
              </h3>
            </div>
          );
        })}
        {propertyType && (
          <div className="text-center">
            <span
              onClick={() => {
                setPropertyType("");
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

export default PropertyTypeDropdown;

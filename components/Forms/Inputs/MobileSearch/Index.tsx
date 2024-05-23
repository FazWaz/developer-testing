import { searchHandler } from "@/actions/search";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Search } from "@/components/Icons/Search";
import React, { FC } from "react";
import PriceRangeDropdown from "@/components/DropDowns/PriceRange";
import SearchInputField from "../../ClientInputs/SearchInput";
import AreaRangeDropdown from "@/components/DropDowns/AreaRange";
import TypeDropdown from "@/components/DropDowns/TypeFilter";
import PropertyTypeDropdown from "@/components/DropDowns/PropertyTypeFilter";

interface MobileSearchInputProps {}

const MobileSearchInput: FC<MobileSearchInputProps> = ({}) => {
  return (
    <form className="relative hidden xs:block" action={searchHandler}>
      <div
        className="w-full rounded-lg p-3 md:p-4 bg-white xs:border xs:border-solid xs:border-slate-100 grid gap-2"
        style={{ boxShadow: " 0px 4px 140px 0px rgba(175, 173, 181, 0.20)" }}
      >
        <div className="flex gap-2">
          <Search className="w-[36px] h-[36px] xs:w-[20px] xs:h-[20px]" />
          <SearchInputField />
        </div>
        <hr />
        <PriceRangeDropdown label="Filter by Price Range" />
        <hr />
        <AreaRangeDropdown label="Filter by Area Range" />
        <hr />
        <PropertyTypeDropdown label="Filter by Property Type" />
        <hr />
        <TypeDropdown label="Filter by Type" />
        <hr />
        <PrimaryButton className="w-full" text="Search" />
      </div>
    </form>
  );
};

export default MobileSearchInput;

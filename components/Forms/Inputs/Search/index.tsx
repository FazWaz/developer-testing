import { searchHandler } from "@/actions/search";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Search } from "@/components/Icons/Search";
import React, { FC } from "react";
import PriceRangeDropdown from "@/components/DropDowns/PriceRange";
import SearchInputField from "../../ClientInputs/SearchInput";
import AreaRangeDropdown from "@/components/DropDowns/AreaRange";
import TypeDropdown from "@/components/DropDowns/TypeFilter";
import PropertyTypeDropdown from "@/components/DropDowns/PropertyTypeFilter";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = ({}) => {
  return (
    <form className="relative xs:hidden" action={searchHandler}>
      <div
        className="w-full rounded-lg p-2 md:p-4 bg-white xs:border xs:border-solid xs:border-slate-100 flex items-center gap-2"
        style={{ boxShadow: " 0px 4px 140px 0px rgba(175, 173, 181, 0.20)" }}
      >
        <Search className="w-[36px] h-[36px] xs:w-[20px] xs:h-[20px]" />
        <SearchInputField />
        <span className="text-slate-300 xs:hidden">|</span>
        <div className="w-[15%]">
          <PriceRangeDropdown />
        </div>
        <span className="text-slate-300 pr-2 xs:hidden">|</span>
        <div className="w-[15%]">
          <AreaRangeDropdown />
        </div>
        <span className="text-slate-300 pr-2 xs:hidden">|</span>
        <div className="w-[15%] pr-3">
          <PropertyTypeDropdown />
        </div>
        <span className="text-slate-300 pr-2 xs:hidden">|</span>
        <div className="w-[15%] pr-3">
          <TypeDropdown />
        </div>
        <PrimaryButton text="Search" />
      </div>
    </form>
  );
};

export default SearchInput;

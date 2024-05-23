import MobileSearchInput from "@/components/Forms/Inputs/MobileSearch/Index";
import SearchInput from "@/components/Forms/Inputs/Search";
import React, { FC } from "react";

interface SearchSectionProps {}

const SearchSection: FC<SearchSectionProps> = ({}) => {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col py-20 xs:py-10 items-center  gap-8 md:gap-24 w-full max-w-screen-xl mx-5 md:mx-20">
        <div className="flex flex-col text-center gap-5">
          <h1 className="text-black text-2xl md:text-6xl font-bold">Search</h1>
          <p className="text-textColor text-sm md:text-lg w-full md:w-[505px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
            eligendi blanditiis laboriosam
          </p>
        </div>
        <div className="w-full">
          <SearchInput />
          <MobileSearchInput></MobileSearchInput>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;

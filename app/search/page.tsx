import SearchResultSection from "@/containers/search-page/result-section";
import SearchSection from "@/containers/search-page/search-section";
import React, { FC } from "react";

interface SearchPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  return (
    <main>
      <SearchSection />
      <SearchResultSection searchParams={searchParams} />
    </main>
  );
};

export default SearchPage;

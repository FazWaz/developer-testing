"use client";

import { useSearchParams } from "next/navigation";
import React, { FC, useCallback, useState } from "react";

interface SearchInputFieldProps {}
const SearchInputField: FC<SearchInputFieldProps> = ({}) => {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams?.get("search") || "");
  const onChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setValue(e.target.value);
    },
    []
  );
  return (
    <input
      type="text"
      name="search"
      placeholder="Search Properties"
      className="h-full w-[70%] text-black xs:text-sm border-none outline-none"
      onChange={onChange}
      value={value}
    />
  );
};

export default SearchInputField;

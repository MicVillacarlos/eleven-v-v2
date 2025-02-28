import React from "react";
import { SearchIcon } from "../../svg/SearchIcon";

interface SearchInputProps {
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { onChangeSearch } = props;
  return (
    <div className="relative mt-1 mb-7">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        id="table-search"
        className="md:w-1/4 sm:w-1/2 p-2.5 pl-10 pr-3 text-sm text-gray-900 border-none outline-none focus:ring-0 focus:border-none rounded-lg"
        placeholder="Search"
        onChange={onChangeSearch}
      />
    </div>
  );
};

export default SearchInput;

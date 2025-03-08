import React from "react";
import { SearchIcon } from "../../svg/SearchIcon";

interface SearchInputProps {
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ onChangeSearch }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        id="table-search"
        className="w-full p-2.5 pl-10 pr-3 text-sm text-gray-900 border-none outline-none focus:ring-0 focus:border-none rounded-lg"
        placeholder="Search"
        onChange={onChangeSearch}
      />
    </div>
  );
};

export default SearchInput;

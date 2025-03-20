import React, { useState } from "react";
import { FilterCategory, filterOptions } from "../../../utils/options/options";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";

interface FilterTableButtonProps {
  onSelectFilter: (selectedFilters: Record<string, string>) => void;
  options: FilterCategory[];
  filterValue: { [key: string]: string };
  onClickReset: () => void;
  buttonName?: string
}

const FilterTableButton = (props: FilterTableButtonProps) => {
  const { onSelectFilter, filterValue, onClickReset, buttonName } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSelect = (header: string, value: string) => {
    onSelectFilter({ [header]: value });
  };

  return (
    <div className="flex items-center justify-center relative z-50">
      <button
        id="dropdownDefault"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center text-white bg-[#205072] hover:bg-blue-800 focus:ring-4 font-semibold focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 w-full"
        type="button"
      >
        {buttonName ?? "Filter"}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute top-12 right-0 w-56 px-3 pb-3 bg-white rounded-lg shadow"
        >
          {filterOptions.map((category, index) => (
            <div key={index}>
              <h6 className="mb-3 text-base font-semibold text-gray-900 pt-3">
                {category.header}
              </h6>
              <ul
                className="space-y-2 text-base"
                aria-labelledby="dropdownDefault"
              >
                {category.options.map((option) => (
                  <li key={option.id} className="flex items-center">
                    <input
                      id={`filter-${category.header_value}-${option.value}`}
                      type="checkbox"
                      checked={
                        filterValue[category.header_value] === option.value
                      }
                      onChange={() =>
                        handleFilterSelect(category.header_value, option.value)
                      }
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`filter-${category.header_value}-${option.value}`}
                      className="ml-2 text-base font-medium text-gray-900"
                    >
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-3">
            <PrimaryButton onClick={onClickReset}>Reset</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTableButton;

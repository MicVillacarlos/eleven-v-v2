"use client";
import React from "react";

interface OptionProps {
  _id: string;
  value: string;
  name: string;
}

interface SelectInputProps {
  id: string;
  options: OptionProps[];
  placeHolder: string;
  label: string;
  required?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({
  id,
  options,
  placeHolder,
  label,
  required,
  value,
  onChange,
}: SelectInputProps) => {

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={
          value
            ? "h-10 w-full rounded-lg border-r-8 border-transparent px-2 text-sm outline outline-gray-300"
            : "h-10 w-full rounded-lg border-r-8 border-transparent px-2 text-sm outline outline-gray-300 text-gray-400"
        }
      >
        <option disabled={value ? true : false}>{placeHolder}</option>
        {options.map((item) => (
          <option key={item._id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

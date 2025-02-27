import React from "react";

interface NumberInputProps {
  id: string;
  label: string;
  placeholder: string;
  prefix?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: number;
}

const NumberInput = ({
  label,
  placeholder,
  prefix,
  handleChange,
  id,
  required = false,
  value,
}: NumberInputProps) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-blue-500 focus-within:border-[#205072]">
        {prefix && (
          <span className="px-3 text-gray-500 border-r border-gray-300">
            {prefix}
          </span>
        )}
        <input
          onChange={handleChange}
          type="number"
          id={id}
          value={value === 0 ? "" : value} 
          placeholder={placeholder}
          required={required}
          className="w-full p-2.5 text-sm text-gray-900 border-none outline-none focus:ring-0 focus:border-none rounded-lg"
        />
      </div>
    </div>
  );
};

export default NumberInput;

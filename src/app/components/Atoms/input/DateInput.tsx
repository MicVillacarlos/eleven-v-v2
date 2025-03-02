import React from "react";

interface DateInputProps {
  id: string;
  label?: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

const DateInput = ({ id, label, placeholder, handleChange, required = false, value }: DateInputProps) => {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative max-w-sm">
        <input
          id={id}
          type="date"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
          value={value}
          min="2024-06-04"
          max="2025-05-05"
        />
      </div>
    </div>
  );
};

export default DateInput;

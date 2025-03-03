import moment from 'moment-timezone';
import React, { useState } from "react";
import { config } from "../../../../config/config";

interface DateInputProps {
  id: string;
  label?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
  placeholder: string;
  minDate?: string;
}

const DateInput = ({ id, label, handleChange, required = false, value, minDate, placeholder}: DateInputProps) => {
  const [inputType, setInputType] = useState("text");

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className="relative max-w-sm">
        <input
          id={id}
          type={inputType}
          onFocus={() => setInputType("date")}
          onBlur={() => !value && setInputType("text")}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          value={value}
          max={minDate ?? moment().tz(config.timezone!).format("YYYY-MM-DD")}
        />
      </div>
    </div>
  );
};

export default DateInput;

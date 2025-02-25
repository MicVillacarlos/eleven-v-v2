import React from "react";
import { LockIcon } from "../../svg/LockIcon";
import { EyeOnIcon } from "../../svg/EyeOnIcon";
import { EyeOffIcon } from "../../svg/EyeOffIcon";

interface PasswordInputProps {
  id: string;
  label: string;
  isShowPassword: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickShowPassword: () => void;
  errorMessage?: string;
  value: string;
}

const PasswordInput = ({
  id,
  label,
  isShowPassword,
  handleChange,
  onClickShowPassword,
  errorMessage,
  value,
}: PasswordInputProps) => {
  return (
    <div className="mb-8">
      <label
        htmlFor={id}
        className="block mb-2 text-base font-medium text-gray-900 mt-8 font-medium"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center pl-2 pointer-events-none">
          <LockIcon size={28} />
        </div>
        <input
          type={isShowPassword ? "text" : "password"}
          id={id}
          className={
            errorMessage
              ? "border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-[#205072] block w-full pl-10 p-2.5"
              : "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-[#205072] block w-full pl-10 p-2.5"
          }
          placeholder={label}
          onChange={handleChange}
          value={value}
          required
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={onClickShowPassword}
        >
          {isShowPassword ? <EyeOnIcon /> : <EyeOffIcon />}
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-base italic mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default PasswordInput;

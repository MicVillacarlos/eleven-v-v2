import { FC } from "react";
import { IconProps } from "./type";

export const SearchIcon: FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  className = "w-4 h-4 text-gray-500",
}) => {
  return (
    <svg
      className={`${className}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size * 0.8}
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );
};

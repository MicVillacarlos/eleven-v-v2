import { FC } from "react";
import { IconProps } from "./type";

export const LodgersIcon: FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  className = "text-gray-500 dark:text-gray-400",
}) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      className={`w-${size} h-${size * 0.8} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 20"
      fill={color}
      aria-label="Lodgers Icon"
    >
      <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
    </svg>
  );
};

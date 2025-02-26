import { FC } from "react";
import { IconProps } from "./type";

export const AddIcon: FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  className = "text-gray-500 dark:text-gray-400",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      className={`w-${size} h-${size * 0.8} ${className}`}
      fill={color}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
};



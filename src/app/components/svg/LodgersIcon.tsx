import { FC } from "react";
import { IconProps } from "./type";

export const LodgersIcon: FC<IconProps> = ({}) => {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_114_764)">
        <path
          d="M9 9.5C11.4853 9.5 13.5 7.48527 13.5 5C13.5 2.51472 11.4853 0.5 9 0.5C6.51472 0.5 4.5 2.51472 4.5 5C4.5 7.48527 6.51472 9.5 9 9.5Z"
          fill="#7996AA"
        />
        <path
          d="M18 17C18 14.5146 15.9853 12.5 13.5 12.5H4.5C2.01472 12.5 0 14.5146 0 17V21.5H18V17Z"
          fill="#7996AA"
        />
      </g>
      <defs>
        <clipPath id="clip0_114_764">
          <rect width="18" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

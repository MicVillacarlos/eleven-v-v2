import { FC } from "react";
import { IconProps } from "./type";

export const DashboardIcon: FC<IconProps> = ({color}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_114_757)">
        <path
          d="M1 6.727C1 2.01081 2.01081 1 6.727 1H12.523C17.2391 1 18.25 2.01081 18.25 6.727V12.523C18.25 17.2391 17.2391 18.25 12.523 18.25H6.727C2.01081 18.25 1 17.2391 1 12.523V6.727Z"
          stroke={color ?? "#7996AA"}
          strokeWidth="2"
        />
        <path
          d="M18.25 6.25H1"
          stroke={color ?? "#7996AA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.25 18.25V6.25"
          stroke={color ?? "#7996AA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_114_757">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

import { FC } from "react";
import { IconProps } from "./type";

export const LogoutIcon: FC<IconProps> = ({}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 10H11M16 13L18.913 10.087C18.961 10.039 18.961 9.961 18.913 9.913L16 7M14 3V2.5C14 1.67157 13.3284 1 12.5 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H12.5C13.3284 19 14 18.3284 14 17.5V17"
        stroke="#7996AA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

import React from "react";

interface LoadingbarProps {
  height?: number;
  margin?: number;
}

const Loadingbar = ({ height, margin }: LoadingbarProps) => {
  return (
    <div
      className={`animate-pulse h-${height ?? 7} mb-${
        margin ?? 2
      } rounded bg-gray-200`}
    ></div>
  );
};

export default Loadingbar;

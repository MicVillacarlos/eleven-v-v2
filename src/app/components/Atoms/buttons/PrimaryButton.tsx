import React from "react";

type PrimaryButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  children: string;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { type, children } = props;
  return (
    <button
      type={type}
      className="text-white bg-[#205072] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

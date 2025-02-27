import React from "react";

type PrimaryButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  width?: string;
  onClick?: () => void;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { type, children, width, onClick } = props;
  return (
    <button
      type={type}
      className={`flex items-center justify-center text-white bg-[#205072] hover:bg-blue-800 focus:ring-4 font-semibold focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 ${
        width ?? "w-full"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

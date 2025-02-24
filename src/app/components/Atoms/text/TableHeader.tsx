import React from "react";

const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-extrabold leading-none tracking-tight text-gray-900 text-2xl align-center">
      {children}
    </h1>
  );
};

export default TableHeader;

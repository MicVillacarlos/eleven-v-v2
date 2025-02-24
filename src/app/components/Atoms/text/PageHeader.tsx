import React from "react";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 text-2xl align-center">
      {children}
    </h1>
  );
};

export default PageHeader;

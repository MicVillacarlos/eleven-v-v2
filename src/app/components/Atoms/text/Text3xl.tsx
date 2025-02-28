import React from "react";

const Text3xl = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="font-extrabold leading-none tracking-tight text-gray-900 text-3xl align-center">
      {children}
    </p>
  );
};

export default Text3xl;

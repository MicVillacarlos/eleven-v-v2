import React from "react";
import Loadingbar from "../../Atoms/loading/Loadingbar";

const TableLoading = () => {
  return (
    <div className="w-full flex flex-col gap-3 p-5 animate-pulse rounded rounded-lg">
      <div className="mb-3">
        <Loadingbar />
      </div>
      <Loadingbar />
      <Loadingbar />
      <Loadingbar />
      <Loadingbar />
      <Loadingbar />
    </div>
  );
};

export default TableLoading;

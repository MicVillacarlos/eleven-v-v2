import React from "react";
import { SearchIcon } from "../../svg/SearchIcon";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface TableProps<T> {
  isNoQuery?: boolean;
  data: T[];
  columns: Column<T>[];
}

const Table = <T,>({ data, columns, isNoQuery }: TableProps<T>) => {
  return (
    <div className="relative overflow-x-auto">
      <div className="pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        {!isNoQuery && (
          <div className="relative mt-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              id="table-search"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        )}
      </div>
      <div className="relative overflow-x-auto rounded-t-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs uppercase bg-[#205072] text-white">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} scope="col" className="px-6 py-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white border-b border-gray-200">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4">
                    {item[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

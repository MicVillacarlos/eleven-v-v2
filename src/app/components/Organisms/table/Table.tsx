import React from "react";
import { moneyFormat, paginationPages } from "../../../helpers/helpers";
import { DeleteIcon } from "../../svg/DeleteIcon";
import { EditIcon } from "../../svg/EditIcon";
import { EyeOnIcon } from "../../svg/EyeOnIcon";
import { NextIcon } from "../../svg/NextIcon";
import { PreviousIcon } from "../../svg/PreviousIcon";
import { SearchIcon } from "../../svg/SearchIcon";
import { TableProps } from "./type";

const Table = <T,>({
  data,
  columns,
  isNoQuery,
  handleNextNavigation,
  handlePrevNavigation,
  onSelectTablePage,
  pagination,
}: TableProps<T>) => {
  const pages = paginationPages(
    pagination.current,
    pagination.limit,
    pagination.total
  );

  const getCellContent = <T,>(
    item: T,
    col: { key: keyof T; type?: string }
  ) => {
    const value = item[col.key];

    if (col.type === "money" && typeof value === "number") {
      return moneyFormat(value);
    }

    return value as React.ReactNode;
  };

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
                className="block pt-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          )}
        </div>
        <div className="relative overflow-x-auto rounded-t-md">
          <table className="w-full text-base text-left rtl:text-right text-gray-500">
            <thead className="text-sm uppercase bg-[#205072] text-white">
              <tr>
                {columns.map((col) => {
                  return (
                    <th
                      key={String(col.key)}
                      scope="col"
                      className={`px-6 py-3 ${
                        col.justify === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {col.label}
                    </th>
                  );
                })}
                <th className="px-6 py-3 flex justify-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-white border-b border-gray-200">
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-6 py-4 ${
                        col.justify === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {getCellContent(item, col)}
                    </td>
                  ))}
                  <td className="flex justify-center px-6 py-4">
                    <button className="hover:bg-gray-100 hover:text-gray-700">
                      <EyeOnIcon size={25} />
                    </button>
                    <div className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 mr-2 ml-2" />
                    <button className="hover:bg-gray-100 hover:text-gray-700">
                      <EditIcon />
                    </button>
                    <div className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 mr-2 ml-2" />
                    <button className="hover:bg-gray-100 hover:text-gray-700">
                      <DeleteIcon size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Page navigation">
            <ul className="flex items-center justify-end w-full -space-x-px h-8 text-base mt-5">
              <li>
                <a
                  onClick={handlePrevNavigation}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <PreviousIcon />
                </a>
              </li>

              {pages.map((item, index) => {
                const isActive = item === pagination.current;
                return (
                  <li key={index}>
                    <a
                      onClick={() => onSelectTablePage(item)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border cursor-pointer
          ${
            isActive
              ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}

              <li>
                <a
                  onClick={handleNextNavigation}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <NextIcon />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  );
};

export default Table;

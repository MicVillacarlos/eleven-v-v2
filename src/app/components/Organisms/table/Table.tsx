import React from "react";
import { formatDate, moneyFormat, paginationPages } from "../../../helpers/helpers";
import { DeleteIcon } from "../../svg/DeleteIcon";
import { EditIcon } from "../../svg/EditIcon";
import { EmptyBoxIcon } from "../../svg/EmptyBoxIcon";
import { EyeOnIcon } from "../../svg/EyeOnIcon";
import { NextIcon } from "../../svg/NextIcon";
import { PreviousIcon } from "../../svg/PreviousIcon";
import { TableProps } from "./type";
import StatusSelectInput from "../../Atoms/input/StatusSelectInput";

const Table = <T extends { _id: string; },>({
  data,
  columns,
  handleNextNavigation,
  handlePrevNavigation,
  onSelectTablePage,
  onClickEdit,
  onClickDelete,
  onClickView,
  onChangeSelectStatus,
  pagination,
}: TableProps<T>) => {
  const pages = paginationPages(
    pagination.current,
    pagination.limit,
    pagination.total
  );

  const getCellContent = <T extends { _id: string }>(item: T, col: { key: keyof T; type?: string }) => {
    const value = item[col.key];
    if (col.type === "money" && typeof value === "number") {
      return moneyFormat(value);
    }

    if (col.type === "date") {
      return formatDate(value as string | Date);
    }

    if (col.type === "status_select") {
      return (
        <StatusSelectInput
          id={"status"}
          value={value as string}
          onChange={(e) => onChangeSelectStatus!(e, item._id ?? "")}
        />
      );
    }

    return value as React.ReactNode;
  };

  return (
    <div className="relative overflow-x-auto w-full">
      {data.length ? (
        <>
          <div className="overflow-x-auto rounded-t-md">
            {
              <table className="w-full text-base text-left rtl:text-right text-gray-500 shadow-sm">
                <thead className="text-sm uppercase bg-[#205072] text-white">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={String(col.key)}
                        scope="col"
                        className={`px-6 py-3 ${
                          col.justify === "right" ? "text-right" : "text-left"
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                    {(onClickView || onClickDelete || onClickEdit) && (
                      <th className="px-6 py-3 text-center">Actions</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-gray-200"
                    >
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

                      {(onClickView || onClickDelete || onClickEdit) && (
                        <td className="flex justify-center px-6 py-4 space-x-2">
                          {onClickView && (
                            <button
                              onClick={() => onClickView(item)}
                              className="hover:bg-gray-100 hover:text-gray-700"
                            >
                              <EyeOnIcon size={25} />
                            </button>
                          )}

                          {onClickEdit && (
                            <>
                              {onClickView && (
                                <div className="w-px self-stretch bg-gray-300 opacity-25" />
                              )}
                              <button
                                onClick={() => onClickEdit(item)}
                                className="hover:bg-gray-100 hover:text-gray-700"
                              >
                                <EditIcon />
                              </button>
                            </>
                          )}

                          {onClickDelete && (
                            <>
                              {(onClickView || onClickEdit) && (
                                <div className="w-px self-stretch bg-gray-300 opacity-25" />
                              )}
                              <button
                                onClick={() => onClickDelete(item)}
                                className="hover:bg-gray-100 hover:text-gray-700"
                              >
                                <DeleteIcon />
                              </button>
                            </>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            }

            {/* {--------------- Start: Pagination Bar -----------------} */}

            {/* {--------------- End: Pagination Bar -----------------} */}
          </div>
          <nav aria-label="Page navigation" className="w-full">
            <ul className="flex items-center justify-end p-2 text-base w-full rounded-b-md bg-[#205072]">
              <li>
                <button
                  onClick={handlePrevNavigation}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <PreviousIcon />
                </button>
              </li>

              {pages.map((item, index) => {
                const isActive = item === pagination.current;
                return (
                  <li key={index}>
                    <button
                      onClick={() => onSelectTablePage(item)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border cursor-pointer
                   ${
                     isActive
                       ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-gray-700"
                       : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                   }`}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}

              <li>
                <button
                  onClick={handleNextNavigation}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <NextIcon />
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className="w-full bg-white rounded-lg h-[300px] flex flex-col justify-center items-center">
          <EmptyBoxIcon size={70} color="#9ca3af" />
          <p className="mt-5 font-medium leading-none tracking-tight text-gray-400 text-xl align-center">
            No Data Found
          </p>
        </div>
      )}
    </div>
  );
};

export default Table;

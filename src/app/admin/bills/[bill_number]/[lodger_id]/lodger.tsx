"use client";
import React, { JSX, useCallback, useState } from "react";
import Layout from "../../../../components/Organisms/layout/Layout";
import Text3xl from "../../../../components/Atoms/text/Text3xl";
import TableLoading from "../../../../components/Organisms/loaders/TableLoading";
import dynamic from "next/dynamic";
import {
  Column,
  TableProps,
} from "../../../../components/Organisms/table/type";
import TextLarge from "../../../../components/Atoms/text/TextLarge";
import { Bill } from "../../../../../lib/admin/api/bills/types";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const LodgerTable = dynamic(
  () => import("../../../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string }>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Lodger = ({
  initialBills,
  initialTotal,
}: {
  initialBills: Bill[];
  initialTotal: number;
}) => {
  const [billsTableData, setBillsTableData] = useState<Bill[]>(initialBills);

  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: initialTotal,
  });

  const tableColumns: Column<Bill>[] = [
    { key: "bill_number", label: "Bill No." },
    { key: "room_number", label: "Room" },
    {
      key: "lodger_full_name",
      label: "Lodger Name",
    },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "type_of_bill", label: "Bill Type" },
    { key: "status", label: "Status", type: "status_select" },
    { key: "bill_amount", label: "Amount", type: "money", justify: "right" },
  ];

  const handleNextPagination = useCallback(() => {
    setPagination((prevState) => {
      const { total, limit, current } = prevState;
      const lastPage = Math.ceil(total / limit);
      return current < lastPage
        ? { ...prevState, current: current + 1 }
        : prevState;
    });
  }, []);

  const handlePrevPagination = useCallback(() => {
    setPagination((prevState) => ({
      ...prevState,
      current: Math.max(1, prevState.current - 1),
    }));
  }, []);

  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl>Send Bill Notification</Text3xl>
      </div>
      <div className="flex gap-1 items-center">
        <p className="text-gray-900"> You are about to send this bill to</p>
        <TextLarge>Michael</TextLarge>
      </div>

      {billsTableData.length && (
        <>
          <div>
            <p className="text-gray-900">
              To attach additional bills, simply click on the ones you want to
              include from the table below.
            </p>
          </div>

          {/* -------------- Header Table--------------*/}
          <div className="flex w-full justify-between mb-6 items-center gap-5 mb-5">
            {/* <div className="lg:w-[150px]">
             <FilterTableButton
               onSelectFilter={function (): void {
                 throw new Error("Function not implemented.");
               }}
               options={[]}
               filterValue={{}}
               onClickReset={function (): void {
                 throw new Error("Function not implemented.");
               }}
             />
           </div> */}
          </div>
          <LodgerTable
            data={billsTableData}
            columns={tableColumns}
            handleNextNavigation={function (): void {
              throw new Error("Function not implemented.");
            }}
            handlePrevNavigation={handlePrevPagination}
            onSelectTablePage={handleNextPagination}
            pagination={pagination}
          />
        </>
      )}
    </Layout>
  );
};

export default Lodger;

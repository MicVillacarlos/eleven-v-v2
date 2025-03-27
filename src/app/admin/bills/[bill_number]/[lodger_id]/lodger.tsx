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
import DividerHorizontal from "../../../../components/Atoms/others/DividerHorizontal";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const BillTable = dynamic(
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
  billSelected,
}: {
  initialBills: Bill[];
  initialTotal: number;
  billSelected: Bill[];
}) => {
  const [billsTableData, setBillsTableData] = useState<Bill[]>(initialBills);
  const [billSelectedData, selectedBillData] = useState<Bill[]>(billSelected);

  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: initialTotal,
  });

  const billTableColumns: Column<Bill>[] = [
    { key: "bill_number", label: "Bill No." },
    { key: "room_number", label: "Room" },
    {
      key: "lodger_full_name",
      label: "Lodger Name",
    },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "type_of_bill", label: "Bill Type" },
    { key: "status", label: "Status" },
    { key: "bill_amount", label: "Amount", type: "money", justify: "right" },
  ];

  const selectedBillTableColumns: Column<Bill>[] = [
    { key: "bill_number", label: "Bill No." },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "type_of_bill", label: "Type" },
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
      <div className="flex gap-1 items-center mb-5">
        <p className="text-gray-900"> You are about to send this bill to</p>
        <TextLarge>{billSelectedData[0].lodger_full_name}</TextLarge>
      </div>
      <p className="text-gray-900 mb-2 text-sm italic"> Email Preview:</p>
      <div className="mb-20 p-10 bg-white">
        <p className="text-gray-500 text-sm">
          Dear {billSelectedData[0].lodger_full_name},
        </p>
        <p className="text-gray-500 my-6 text-sm">
          Your monthly bill/s is as follows:
        </p>
        <BillTable
          data={billSelectedData}
          columns={selectedBillTableColumns}
          isNoPagination
          handleNextNavigation={function (): void {
            throw new Error("Function not implemented.");
          }}
          handlePrevNavigation={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSelectTablePage={function (): void {
            throw new Error("Function not implemented.");
          }}
          pagination={{
            current: 0,
            limit: 0,
            total: 0,
          }}
        />
        <p className="text-gray-500 mt-10 text-sm">Please settle your bill.</p>
        <DividerHorizontal />
        <p className="text-gray-500 text-sm">Eleven-V, All rights reserved.</p>
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
          <div className="flex w-full justify-between mb-6 items-center gap-5 mb-5"></div>
          <BillTable
            data={billsTableData}
            columns={billTableColumns}
            handleNextNavigation={function (): void {
              throw new Error("Function not implemented.");
            }}
            handlePrevNavigation={handlePrevPagination}
            onSelectTablePage={handleNextPagination}
            pagination={pagination}
            onClickCheckbox={()=>{}}
          />
        </>
      )}
    </Layout>
  );
};

export default Lodger;

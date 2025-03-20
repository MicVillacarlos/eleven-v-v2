"use client"
import React, { JSX } from "react";
import Layout from "../../../../components/Organisms/layout/Layout";
import Text3xl from "../../../../components/Atoms/text/Text3xl";
import TableLoading from "../../../../components/Organisms/loaders/TableLoading";
import dynamic from "next/dynamic";
import { TableProps } from "../../../../components/Organisms/table/type";
import TextLarge from "../../../../components/Atoms/text/TextLarge";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const LodgerTable = dynamic(
  () => import("../../../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string; }>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Lodger = () => {
  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl>Send Bill Notification</Text3xl>
      </div>
      <div>
        <TextLarge> You are about to send this bill to User</TextLarge>
      </div>

      <div>
        <TextLarge>
          To attach additional bills, simply click on the ones you want to
          include from the table below.
        </TextLarge>
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
        data={[]}
        columns={[]}
        handleNextNavigation={function (): void {
          throw new Error("Function not implemented.");
        }}
        handlePrevNavigation={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSelectTablePage={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
        pagination={{
          current: 0,
          limit: 0,
          total: 0,
        }}
      />
    </Layout>
  );
};

export default Lodger;

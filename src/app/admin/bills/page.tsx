"use client"
import React, { JSX, Suspense, useCallback, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import { AddIcon } from "../../components/svg/AddIcon";
import TableLoading from "../../components/Organisms/loaders/TableLoading";
import dynamic from "next/dynamic";
import { TableProps } from "../../components/Organisms/table/type";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const BillsTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Bills = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 5,
    total: 0,
  });

  // ------------------ TABLE FUNCTIONS --------------------

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

  const onSelectTablePage = useCallback((page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      current: page,
    }));
  }, []);
  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl> Bills Management </Text3xl>
        <div className="lg:w-[150px]">
          <PrimaryButton>
            <AddIcon color="white" />
            Add Bills
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header Table--------------*/}
      <Suspense fallback={<TableLoading />}>
        <BillsTable
          data={[]}
          columns={[]}
          handleNextNavigation={handlePrevPagination}
          handlePrevNavigation={handleNextPagination}
          onSelectTablePage={onSelectTablePage}
          pagination={pagination}
        />
      </Suspense>
    </Layout>
  );
};

export default Bills;

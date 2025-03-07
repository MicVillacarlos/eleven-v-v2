"use client";
import React, { JSX, Suspense, useCallback, useEffect, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import { AddIcon } from "../../components/svg/AddIcon";
import TableLoading from "../../components/Organisms/loaders/TableLoading";
import dynamic from "next/dynamic";
import { TableProps } from "../../components/Organisms/table/type";
import SearchInput from "../../components/Atoms/input/SearchInput";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import BillAddEditFormContent from "./BillAddEditFormContent";
import { AddEditBillFormData } from "../../../lib/admin/api/bills/types";
import { useConfirmDeleteModal } from "../../utils/providers/ConfirmDeleteModalProvider";
import { useToastContext } from "../../utils/providers/ToastProvider";
import { createBill } from "../../../lib/admin/api/bills/bills";

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
  const [isViewAddEditBillModal, setIsViewAddEditBillModal] =
    useState<boolean>(false);

  const [billAddEditData, setBillAddEditData] = useState<AddEditBillFormData>({
    type_of_bill: "",
    lodger_id: "",
    reading_start_date: "",
    reading_end_date: "",
    present_reading: 0,
    past_reading: 0,
    current_bill: 0,
    monthly_given_bill: 0,
    add_on: 0,
    due_date: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 5,
    total: 0,
  });

  const { confirmDeleteModal } = useConfirmDeleteModal();
  const { showToast } = useToastContext();

  const resetAddEditBillData = () => {
    setBillAddEditData({
      type_of_bill: "",
      lodger_id: "",
      reading_start_date: "",
      reading_end_date: "",
      present_reading: 0,
      past_reading: 0,
      current_bill: 0,
      monthly_given_bill: 0,
      add_on: 0,
      due_date: "",
    });
  };

  // ------------------ TABLE FUNCTIONS --------------------

  useEffect(() => {}, [isViewAddEditBillModal]);

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

  const onSearchTable = () => {};

  const onAddEditBill = () => {
    setIsViewAddEditBillModal(true);
  };

  const onCloseAddEditBillModal = () => {
    setIsViewAddEditBillModal(false);
    resetAddEditBillData();
  };

  const onSubmitAddEditBill = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      add_on,
      current_bill,
      due_date,
      lodger_id,
      monthly_given_bill,
      past_reading,
      present_reading,
      reading_end_date,
      reading_start_date,
      type_of_bill,
    } = billAddEditData;
    try {
      const result = await createBill(
        due_date,
        past_reading,
        present_reading,
        current_bill,
        monthly_given_bill,
        type_of_bill,
        add_on,
        reading_end_date,
        reading_start_date,
        lodger_id
      );

      if (result.success) {
        showToast("Bill added successfully!", "success");
        resetAddEditBillData();
        setIsViewAddEditBillModal(false);
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
  };

  const onHandleChangeform = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBillAddEditData({
      ...billAddEditData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl> Bills Management </Text3xl>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onAddEditBill}>
            <AddIcon color="white" />
            Add Bills
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header Table--------------*/}
      <SearchInput onChangeSearch={onSearchTable} />
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
      <ModalForm
        title={"Add Bill"}
        content={
          <BillAddEditFormContent
            handleChangeForm={onHandleChangeform}
            formData={billAddEditData}
          />
        }
        isOpen={isViewAddEditBillModal}
        onCloseModal={onCloseAddEditBillModal}
        onSubmitForm={onSubmitAddEditBill}
      />
    </Layout>
  );
};

export default Bills;

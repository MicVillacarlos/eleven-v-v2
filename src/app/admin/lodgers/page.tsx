"use client";
import React, { JSX, Suspense, useCallback, useEffect, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import { AddIcon } from "../../components/svg/AddIcon";
import dynamic from "next/dynamic";
import TableLoading from "../../components/Organisms/loaders/TableLoading";
import { Column, TableProps } from "../../components/Organisms/table/type";
import SearchInput from "../../components/Atoms/input/SearchInput";
import { getLodgers } from "../../../lib/admin/api/lodgers/lodger";
import {
  AddEditLodger,
  FetchLodgerType,
} from "../../../lib/admin/api/lodgers/types";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import LodgerAddEditFormContent from "./LodgerAddEditFormContent";

//---Start---Note: Use dynamic(Next Js for Lazy Loading) for components fetching data. This is for optimization
const LodgersTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use dynamic(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Lodgers = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 5,
    total: 0,
  });
  const [lodgerDataTable, setLodgerDataTable] = useState<FetchLodgerType[]>();
  const [isViewAddEditFormModal, setIsViewAddEditFormModal] =
    useState<boolean>(false);
  const [addEditLodgerData, setAddEditLodgerData] = useState<AddEditLodger>({
    first_name: "",
    last_name: "",
    birth_date: "",
    sex: "",
    home_address: "",
    phone_number: 0,
    email: "",
    emergency_contact_person: "",
    emergency_contact_number: 0,
    occupation: "",
    company_or_school: "",
    number_of_room_occupants: 0,
    room_id: "",
  });

  const tableColumns: Column<FetchLodgerType>[] = [
    { key: "room_number", label: "Room Number" },
    { key: "full_name", label: "Full Name" },
    { key: "age", label: "Age", justify: "right" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone Number" },
  ];

  const fetchData = async () => {
    const { data, count } = await getLodgers(
      "",
      pagination.current,
      pagination.limit
    );
    setLodgerDataTable(data);
    setPagination((prevState) => ({
      ...prevState,
      total: count,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current]);

  // ------------------ TABLE FUNCTIONS --------------------

  const onClickAddLodger = () => {
    setIsViewAddEditFormModal(true)
  }

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

  const onClickDeleteLodgerTable = () => {
    
  };

  const onClickEditLodgerTable = () => {};

  const onClickViewLodgerTable = () => {};

  const onHandleChangeform = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAddEditLodgerData({
      ...addEditLodgerData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmitModalForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("DATA:", addEditLodgerData)
  }

  const onCloseModalForm = useCallback(() => {
    setIsViewAddEditFormModal(false);
    setAddEditLodgerData({
      first_name: "",
      last_name: "",
      birth_date: "",
      sex: "",
      home_address: "",
      phone_number: 0,
      email: "",
      emergency_contact_person: "",
      emergency_contact_number: 0,
      occupation: "",
      company_or_school: "",
      number_of_room_occupants: 0,
      room_id: "",
    });
  }, []);

  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl> Lodgers Management </Text3xl>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onClickAddLodger}>
            <AddIcon color="white" />
            Add Lodger
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header Table--------------*/}
      <SearchInput onChangeSearch={onSearchTable} />
      <Suspense fallback={<TableLoading />}>
        <LodgersTable
          data={lodgerDataTable ?? []}
          columns={tableColumns}
          handleNextNavigation={handlePrevPagination}
          handlePrevNavigation={handleNextPagination}
          onSelectTablePage={onSelectTablePage}
          pagination={pagination}
          onClickDelete={onClickDeleteLodgerTable}
          onClickEdit={onClickEditLodgerTable}
          onClickView={onClickViewLodgerTable}
        />
      </Suspense>
      <ModalForm
        content={
          <LodgerAddEditFormContent
            handleChangeForm={onHandleChangeform}
            formData={addEditLodgerData}
          />
        }
        isOpen={isViewAddEditFormModal}
        onSubmitForm={onSubmitModalForm}
        onCloseModal={onCloseModalForm}
        title="Add Ldoger"
        key={'add_edit_lodger'}
      />
    </Layout>
  );
};

export default Lodgers;

"use client";
import dynamic from "next/dynamic";
import React, { JSX, useCallback, useEffect, useState } from "react";
import { addRoom, getRooms } from "../../../lib/admin/api/room/room";
import { AddRoomData, HouseType } from "../../../lib/admin/api/room/types";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import TableHeader from "../../components/Atoms/text/TableHeader";
import Layout from "../../components/Organisms/layout/Layout";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import ModalView from "../../components/Organisms/modal/ModalView";
import { Column, TableProps } from "../../components/Organisms/table/type";
import { AddIcon } from "../../components/svg/AddIcon";
import { useToastContext } from "../../utils/providers/ToastProvider";
import AddRoomFormContent from "./AddRoomFormContent";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { capitalizeFirstLetter } from "../../helpers/helpers";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const RoomTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    ssr: false,
  }
) as <T>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Settings = () => {
  const { showToast } = useToastContext();
  const [isAddRoomModal, setIsAddRoomModal] = useState<boolean>(false);
  const [isViewModal, setIsViewAddModal] = useState<boolean>(false);
  const [addRoomData, setAddRoomData] = useState<AddRoomData>({
    room_type: "",
    price: 0,
    room_number: 0,
  });
  const [viewEditRoomData, setViewEditRoomData] = useState<HouseType>();
  //----- Start: table states ------
  const [roomDataTable, setRoomDataTable] = useState<HouseType[]>();
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 5,
    total: 0,
  });
  //----- End: table states -------

  const tableColumns: Column<HouseType>[] = [
    { key: "room_type", label: "House Type" },
    { key: "price", label: "Price", justify: "right", type: "money" },
    { key: "total_rooms", label: "Total Rooms", justify: "right" },
  ];
  // ------------------- TABLE Functions---------------------//

  const fetchData = async () => {
    const { data, count } = await getRooms(
      "",
      pagination.current,
      pagination.limit
    );
    setRoomDataTable(data);
    setPagination((prevState) => ({
      ...prevState,
      total: count,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current]);

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

  const onCloseAddModalHandler = useCallback(() => {
    setIsAddRoomModal(false);
    setAddRoomData({ room_type: "", price: 0, room_number: 0 });
  }, []);

  // ------------------- ADD ROOM FORM Functions ---------------------//
  const onHandleAddRooom = useCallback(() => {
    setIsAddRoomModal(true);
  }, []);

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { room_type, price, room_number } = addRoomData;

    const roomNumberString = room_number.toString();

    try {
      const result = await addRoom(room_type, price, `RM${roomNumberString}`);
      if (result.room) {
        showToast("Room added successfully!", "success");
        setAddRoomData({ room_type: "", price: 0, room_number: 0 });
        fetchData();
        setIsAddRoomModal(false);
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddRoomData({ ...addRoomData, [e.target.id]: e.target.value });
  };

  //------------------------- ACTION BUTTONS Functions -------------------------
  const onClickEditAction = (data: HouseType | string) => {
    setViewEditRoomData(data as HouseType);
  };

  const onClickViewAction = (data: HouseType | string) => {
    setIsViewAddModal(true);
    setViewEditRoomData(data as HouseType);
  };

  const onCloseModalHandler = () => {
    setIsViewAddModal(false);
  };
  //------------------------- MODAL VIEW Functions-------------------------

  const viewModalContent = <></>;

  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <TableHeader> Rooms Management </TableHeader>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onHandleAddRooom}>
            <AddIcon color="white" />
            Add Room
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header Table--------------*/}

      <RoomTable<HouseType>
        isNoQuery
        data={roomDataTable ?? []}
        columns={tableColumns}
        handleNextNavigation={handleNextPagination}
        handlePrevNavigation={handlePrevPagination}
        onSelectTablePage={onSelectTablePage}
        pagination={pagination}
        onClickEdit={onClickEditAction}
        onClickView={onClickViewAction}
      />

      {/* -------------- Update Password--------------*/}
      <div className="flex w-full justify-between items-center mb-3 mt-20">
        <TableHeader> Admin Change Password</TableHeader>
      </div>
      <UpdatePasswordForm />
      {/* -------------- Update Password--------------*/}
      <ModalForm
        title="Add Room"
        content={
          <AddRoomFormContent
            handleChangeForm={handleChangeForm}
            roomType={addRoomData.room_type}
            roomNumber={addRoomData.room_number}
            price={addRoomData.price}
          />
        }
        isOpen={isAddRoomModal}
        onCloseModal={onCloseAddModalHandler}
        onSubmitForm={onSubmitForm}
      />
      <ModalView
        content={viewModalContent}
        isOpen={isViewModal}
        onCloseModal={onCloseModalHandler}
        title={capitalizeFirstLetter(viewEditRoomData?.room_type ?? "")}
        widthSize="xl"
      />
    </Layout>
  );
};

export default Settings;

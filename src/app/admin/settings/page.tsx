"use client";
import dynamic from "next/dynamic";
import React, { JSX, useCallback, useEffect, useState } from "react";
import { addRoom, getRooms } from "../../../lib/admin/api/room/room";
import { HouseType } from "../../../lib/admin/api/room/types";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import NumberInput from "../../components/Atoms/input/NumberInput";
import TextInput from "../../components/Atoms/input/TextInput";
import TableHeader from "../../components/Atoms/text/TableHeader";
import Layout from "../../components/Organisms/layout/Layout";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import { Column, TableProps } from "../../components/Organisms/table/type";
import { AddIcon } from "../../components/svg/AddIcon";
import { useToastContext } from "../../utils/providers/ToastProvider";
import UpdatePasswordForm from "./UpdatePasswordForm";

interface AddRoomData {
  room_type: string;
  price: number;
  room_number: number;
}

const RoomTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    ssr: false,
  }
) as <T>(props: TableProps<T>) => JSX.Element;

const Settings = () => {
  const { showToast } = useToastContext();
  const [isViewAddRoom, setIsViewAddRoom] = useState<boolean>(false);
  const [addRoomData, setAddRoomData] = useState<AddRoomData>({
    room_type: "",
    price: 0,
    room_number: 0,
  });
  //table
  const [roomData, setRoomData] = useState<HouseType[]>();
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 5,
    total: 0,
  });

  const tableColumns: Column<HouseType>[] = [
    { key: "room_type", label: "House Type" },
    { key: "price", label: "Price", justify: "right", type: "money" },
    { key: "total_rooms", label: "Total Rooms", justify: "right" },
  ];

  const fetchData = async () => {
    const { data, count } = await getRooms(
      "",
      pagination.current,
      pagination.limit
    );
    setRoomData(data);
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

  const onHandleAddRooom = useCallback(() => {
    setIsViewAddRoom(true);
  }, []);

  const onCloseModalHandler = useCallback(() => {
    setIsViewAddRoom(false);
    setAddRoomData({ room_type: "", price: 0, room_number: 0 });
  }, []);

  // ------------------- FORM ---------------------//
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
        setIsViewAddRoom(false);
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

  const formContent = (
    <>
      <TextInput
        label="Room Type"
        placeholder={"Room Type"}
        id={"room_type"}
        handleChange={handleChangeForm}
        value={addRoomData.room_type}
        required
      />
      <NumberInput
        label="Room Number"
        placeholder={"Room Number"}
        prefix="RM"
        id={"room_number"}
        value={addRoomData.room_number}
        handleChange={handleChangeForm}
        required
      />
      <NumberInput
        label="Price"
        placeholder={"Price"}
        prefix="₱"
        id={"price"}
        value={addRoomData.price}
        handleChange={handleChangeForm}
        required
      />
    </>
  );

  return (
    <Layout>
      {/* -------------- Header --------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <TableHeader> Rooms Management </TableHeader>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onHandleAddRooom}>
            <AddIcon color="white" />
            Add Room
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header --------------*/}

      <RoomTable<HouseType>
        isNoQuery
        data={roomData ?? []}
        columns={tableColumns}
        handleNextNavigation={handleNextPagination}
        handlePrevNavigation={handlePrevPagination}
        onSelectTablePage={onSelectTablePage}
        pagination={pagination}
      />

      {/* -------------- Header --------------*/}
      <div className="flex w-full justify-between items-center mb-3 mt-20">
        <TableHeader> Admin Change Password</TableHeader>
      </div>
      {/* -------------- Header --------------*/}
      <UpdatePasswordForm />
      <ModalForm
        widthSize={"xl"}
        title="Add Room"
        content={formContent}
        isOpen={isViewAddRoom}
        onCloseModal={onCloseModalHandler}
        onSubmitForm={onSubmitForm}
      />
    </Layout>
  );
};

export default Settings;

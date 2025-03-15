"use client";
import dynamic from "next/dynamic";
import React, { JSX, Suspense, useCallback, useEffect, useState } from "react";
import { addRoom, getRooms } from "../../../lib/admin/api/room/room";
import { AddRoomData, HouseType } from "../../../lib/admin/api/room/types";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import Text2xl from "../../components/Atoms/text/Text2xl";
import Layout from "../../components/Organisms/layout/Layout";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import ModalView from "../../components/Organisms/modal/ModalView";
import { Column, TableProps } from "../../components/Organisms/table/type";
import { AddIcon } from "../../components/svg/AddIcon";
import {
  capitalizeFirstLetter,
  formatNumberToString,
} from "../../helpers/helpers";
import { useToastContext } from "../../utils/providers/ToastProvider";
import RoomAddFormContent from "./RoomAddFormContent";
import RoomUpdatePasswordForm from "./RoomUpdatePasswordForm";
import { RoomViewModalContent } from "./RoomViewModalContent";
import { RoomDeleteModalContent } from "./RoomDeleteFormContent";
import TableLoading from "../../components/Organisms/loaders/TableLoading";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const RoomTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string }>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Settings = () => {
  const { showToast } = useToastContext();
  //-------- Start: Modal view ------------
  const [isAddRoomModal, setIsAddRoomModal] = useState<boolean>(false);
  const [isViewModal, setIsViewModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  //-------- End: Modal view ------------
  const [addRoomData, setAddRoomData] = useState<AddRoomData>({
    room_type: "",
    price: 0,
    room_number: 0,
  });
  const [viewDeleteRoomData, setViewDeleteRoomData] = useState<HouseType>({
    _id:"",
    key: "",
    total_rooms: 0,
    rooms: [],
    room_type: "",
    price: 0,
  });
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

    const roomNumber = formatNumberToString(room_number, "RM");
    const roomType = capitalizeFirstLetter(room_type.trim());

    try {
      const result = await addRoom(roomType, price, roomNumber);
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
  const onClickDeleteAction = (data: HouseType | string) => {
    setViewDeleteRoomData(data as HouseType);
    setIsDeleteModal(true);
  };

  const onClickViewAction = (data: HouseType | string) => {
    setIsViewModal(true);
    setViewDeleteRoomData(data as HouseType);
  };

  const resetViewDeleteRoomData = () => {
    setViewDeleteRoomData({
      _id:"",
      key: "",
      total_rooms: 0,
      rooms: [],
      room_type: "",
      price: 0,
    });
  }

  //------------------------- MODAL VIEW Functions-------------------------

  const onCloseViewModalHandler = useCallback(() => {
    setIsViewModal(false);
    resetViewDeleteRoomData();
  }, []);

  //------------------------- MODAL DELETE Functions-------------------------

  const onCloseDeleteModalHandler = useCallback(() => {
    setIsDeleteModal(false);
    resetViewDeleteRoomData();
  }, []);

  const onDeleteRoomHandler = useCallback(() => {
    setIsDeleteModal(false);
    setPagination((prevState) => ({
      ...prevState,
      current: 1,
    }));
    resetViewDeleteRoomData();
    fetchData();
  }, []);

  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text2xl> Rooms Management </Text2xl>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onHandleAddRooom}>
            <AddIcon color="white" />
            Add Room
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header Table--------------*/}
      <Suspense fallback={<TableLoading />}>
        <RoomTable<HouseType>
          data={roomDataTable ?? []}
          columns={tableColumns}
          handleNextNavigation={handleNextPagination}
          handlePrevNavigation={handlePrevPagination}
          onSelectTablePage={onSelectTablePage}
          pagination={pagination}
          onClickDelete={onClickDeleteAction}
          onClickView={onClickViewAction}
        />
      </Suspense>

      {/* -------------- Update Password--------------*/}
      <div className="flex w-full justify-between items-center mb-3 mt-20">
        <Text2xl> Admin Change Password</Text2xl>
      </div>
      <RoomUpdatePasswordForm />
      {/* -------------- Update Password--------------*/}
      <ModalForm
        title="Add Room"
        content={
          <RoomAddFormContent
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
        content={
          <RoomDeleteModalContent
            house={viewDeleteRoomData}
            onCloseModal={onDeleteRoomHandler}
          />
        }
        isOpen={isDeleteModal}
        onCloseModal={onCloseDeleteModalHandler}
        title={"Delete Room"}
      />
      <ModalView
        content={<RoomViewModalContent house={viewDeleteRoomData} />}
        isOpen={isViewModal}
        onCloseModal={onCloseViewModalHandler}
        title={capitalizeFirstLetter(viewDeleteRoomData?.room_type ?? "")}
      />
    </Layout>
  );
};

export default Settings;

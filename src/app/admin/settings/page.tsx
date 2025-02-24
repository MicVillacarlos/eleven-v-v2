"use client";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import Modal from "../../components/Organisms/modal/Modal";
import { useToastContext } from "../../utils/providers/ToastProvider";
import Table from "../../components/Organisms/table/Table";
import { HouseType } from "../../../lib/admin/api/room/types";
import { getRooms } from "../../../lib/admin/api/room/room";
import TableHeader from "../../components/Atoms/text/TableHeader";

const Settings = () => {
  const { showToast } = useToastContext();
  const [isViewAddRoom, setIsViewAddRoom] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<HouseType[]>();
  const [query, setQuery] = useState<string>("");

  const modalContent = <div> hello </div>;

  const tableColumns = [
    { key: "room_type", label: "House Type" },
    { key: "price", label: "Price" },
    { key: "total_rooms", label: "Total Rooms" },
  ];

  const fetchData = async () => {
    const { data } = await getRooms(query, 1, 10);
    setRoomData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onHandleAddRooom = useCallback(() => {
    setIsViewAddRoom(true);
  }, []);

  const onCloseModalHandler = useCallback(() => {
    setIsViewAddRoom(false);
  }, []);

  return (
    <Layout>
      {/* -------------- Header --------------*/}
      <div className="flex w-full justify-between items-end">
        <TableHeader> Rooms </TableHeader>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onHandleAddRooom}>Add Room</PrimaryButton>
        </div>
      </div>
      <Table isNoQuery data={roomData ?? []} columns={tableColumns} />

      <Modal
        title="Add Room"
        content={modalContent}
        isOpen={isViewAddRoom}
        onCloseModal={onCloseModalHandler}
      />
    </Layout>
  );
};

export default Settings;

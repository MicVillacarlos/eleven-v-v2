"use client";
import { useCallback, useEffect, useState } from "react";
import { getRooms } from "../../../lib/admin/api/room/room";
import { HouseType } from "../../../lib/admin/api/room/types";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import TableHeader from "../../components/Atoms/text/TableHeader";
import Layout from "../../components/Organisms/layout/Layout";
import Modal from "../../components/Organisms/modal/Modal";
import Table from "../../components/Organisms/table/Table";
import { Column } from "../../components/Organisms/table/type";
import { useToastContext } from "../../utils/providers/ToastProvider";

const Settings = () => {
  const { showToast } = useToastContext();
  const [isViewAddRoom, setIsViewAddRoom] = useState<boolean>(false);

  //table
  const [roomData, setRoomData] = useState<HouseType[]>();
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: 0,
  });

  const modalContent = <div> hello </div>;

  const tableColumns: Column<HouseType>[] = [
    { key: "room_type", label: "House Type" },
    { key: "price", label: "Price" },
    { key: "total_rooms", label: "Total Rooms" },
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
      {/* -------------- Header --------------*/}
      <Table
        isNoQuery
        data={roomData ?? []}
        columns={tableColumns}
        handleNextNavigation={handleNextPagination}
        handlePrevNavigation={handlePrevPagination}
        onSelectTablePage={onSelectTablePage}
        pagination={pagination}
      />

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

"use client";
import React, { useCallback, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import Modal from "../../components/Organisms/modal/Modal";
import { useToastContext } from "../../utils/providers/ToastProvider";
import PageHeader from "../../components/Atoms/text/PageHeader";
import Table from "../../components/Organisms/table/Table";

const Settings = () => {
  const { showToast } = useToastContext();
  const [isViewAddRoom, setIsViewAddRoom] = useState<boolean>(false);

  const modalContent = <div> hello </div>;

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
        <PageHeader>Rooms</PageHeader>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onHandleAddRooom}>Add Room</PrimaryButton>
        </div>
      </div>
      <Table />

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

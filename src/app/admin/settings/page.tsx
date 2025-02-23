"use client";
import React, { useCallback, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import Modal from "../../components/Organisms/modal/Modal";

const Settings = () => {
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
      <PrimaryButton onClick={onHandleAddRooom}>Add Room</PrimaryButton>
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

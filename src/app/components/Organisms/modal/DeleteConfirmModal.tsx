"use client"
import React from "react";
import { WarningIcon } from "../../svg/WarningIcon";

interface ModalPropsType {
  isOpen: boolean;
  onCancelModalHandler: () => void;
  onDeleteModalHandler: () => void;
}

const DeleteConfirmModal = (props: ModalPropsType) => {
  const { isOpen, onCancelModalHandler, onDeleteModalHandler } = props;

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50`}
    >
      <div className={`relative w-full max-h-full max-w-md`}>
        <div className="relative rounded-lg shadow-sm bg-white text-black p-7 flex flex-col items-center">
          <WarningIcon size={80} color={"#D2122E"} />
          <p className="text-2xl font-bold mb-2">Are you sure?</p>
          <p className="text-base mb-8">
            Deleting this is irreversible, you can not retrieve it back.
          </p>
          <div className="flex flex-col w-full gap-2">
            <button
              data-modal-hide="default-modal"
              className="text-white bg-[#D2122E] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={onDeleteModalHandler}
            >
              DELETE PERMANENTLY
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={onCancelModalHandler}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

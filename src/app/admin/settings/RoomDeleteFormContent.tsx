import React, { useState } from "react";
import { deleteRooom } from "../../../lib/admin/api/room/room";
import { useToastContext } from "../../utils/providers/ToastProvider";
import DeleteConfirmModal from "../../components/Organisms/modal/DeleteConfirmModal";
import { HouseType } from "../../../lib/admin/api/room/types";

interface RoomDeleteModalContentProps {
  house: HouseType;
  onCloseModal: () => void;
}

export const RoomDeleteModalContent: React.FC<RoomDeleteModalContentProps> = ({
  house,
  onCloseModal,
}) => {
  const { showToast } = useToastContext();
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] =
    useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");

  const onDeleteRoom = async () => {
    try {
      const result = await deleteRooom(deleteItemId);
      if (result.data) {
        showToast("Room successfully deleted!", "success");
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
    setIsOpenConfirmDelete(false);
    onCloseModal();
  };

  const onPressDelete = (id: string) => {
    setIsOpenConfirmDelete(true);
    setDeleteItemId(id);
  };

  return (
    <div>
      <div className="flex flex-col w-full">
        {house.rooms.map(
          (item: { _id: string; room_number: string }, index: number) => {
            const isLastItem = index === house.rooms.length - 1;

            return (
              <div key={item._id}>
                <div
                  className="flex justify-between w-full items-center"
                  key={item._id}
                >
                  {item.room_number}
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-[#D2122E] rounded-lg border border-gray-200 hover:bg-red-700 hover:text-gray-700 focus:ring-4 focus:ring-gray-100"
                    onClick={() => onPressDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
                {!isLastItem && (
                  <hr className="h-px my-5 bg-gray-200 border-0" />
                )}
              </div>
            );
          }
        )}
      </div>
      <DeleteConfirmModal
        isOpen={isOpenConfirmDelete}
        onCancelModalHandler={() => setIsOpenConfirmDelete(false)}
        onDeleteModalHandler={() => onDeleteRoom()}
      />
    </div>
  );
};

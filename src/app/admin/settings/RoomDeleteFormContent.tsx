import React from "react";
import { deleteRooom } from "../../../lib/admin/api/room/room-client";
import { useToastContext } from "../../utils/providers/ToastProvider";
import { HouseType } from "../../../lib/admin/api/room/types";
import { useConfirmDeleteModal } from "../../utils/providers/ConfirmDeleteModalProvider";

interface RoomDeleteModalContentProps {
  house: HouseType;
  onCloseModal: () => void;
}

export const RoomDeleteModalContent: React.FC<RoomDeleteModalContentProps> = ({
  house,
  onCloseModal,
}) => {
  const { showToast } = useToastContext();

  const { confirmDeleteModal } = useConfirmDeleteModal();

  const onDeleteRoom = async (id: string) => {
    try {
      const result = await deleteRooom(id);
      if (result.data) {
        showToast("Room successfully deleted!", "success");
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
    onCloseModal();
  };

  const handleDelete = (id: string) =>
    confirmDeleteModal(() => onDeleteRoom(id));

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
                    onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

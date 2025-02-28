import React from "react";
import { HouseType } from "../../../lib/admin/api/room/types";
import TextInput from "../../components/Atoms/input/TextInput";
import NumberInput from "../../components/Atoms/input/NumberInput";
import { deleteRooom } from "../../../lib/admin/api/room/room";
import { useToastContext } from "../../utils/providers/ToastProvider";

interface RoomEditModalContentProps {
  house: HouseType;
  onCloseModal: () => void;
}

export const RoomEditModalContent: React.FC<RoomEditModalContentProps> = ({
  house,
  onCloseModal,
}) => {
  const { showToast } = useToastContext();

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {};

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

  return (
    <div>
      <div className="flex flex-col w-full">
        {house.rooms.map(
          (item: { _id: string; room_number: string }, index: number) => {
            const roomNumber = Number(item.room_number.slice(2));
            const isLastItem = index === house.rooms.length - 1;

            return (
              <div className="" key={item._id}>
                <TextInput
                  label="House Type"
                  placeholder={"House Type"}
                  id={"room_type"}
                  handleChange={handleChangeForm}
                  value={house.room_type}
                  required
                />
                <NumberInput
                  label="Room Number"
                  placeholder={"Room Number"}
                  prefix="RM"
                  id={"room_number"}
                  value={roomNumber}
                  handleChange={handleChangeForm}
                  required
                />
                <NumberInput
                  label="Price"
                  placeholder={"Price"}
                  prefix="₱"
                  id={"price"}
                  value={house.price}
                  handleChange={handleChangeForm}
                  required
                />
                <div className="flex justify-end w-full">
                  <button
                    data-modal-hide="default-modal"
                    type="submit"
                    className="text-white bg-[#205072] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    // onClick={() => onDeleteRoom(item._id)}
                  >
                    Save
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-[#D2122E] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    onClick={() => onDeleteRoom(item._id)}
                  >
                    Delete
                  </button>
                </div>
                {!isLastItem && (
                  <hr className="h-px my-8 bg-gray-200 border-0" />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

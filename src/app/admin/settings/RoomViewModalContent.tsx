import React from "react";
import { HouseType } from "../../../lib/admin/api/room/types";
import ViewTextLabel from "../../components/Atoms/text/ViewTextLabel";
import { moneyFormat } from "../../helpers/helpers";

interface RoomViewModalContentProps {
  house: HouseType;
}

export const RoomViewModalContent: React.FC<RoomViewModalContentProps> = ({
  house,
}) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/2">
          <ViewTextLabel>Total Rooms:</ViewTextLabel>
          {house.total_rooms}
        </div>
        <div>
          <ViewTextLabel>Price:</ViewTextLabel>
          {moneyFormat(house.price)}
        </div>
      </div>
      <div className="mt-5">
        <div className="w-1/2">
          <ViewTextLabel>Rooms</ViewTextLabel>
          {house.rooms.map((item) => item.room_number).join(", ")}
        </div>
      </div>
    </div>
  );
};

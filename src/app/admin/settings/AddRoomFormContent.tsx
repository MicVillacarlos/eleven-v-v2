import React from "react";
import TextInput from "../../components/Atoms/input/TextInput";
import NumberInput from "../../components/Atoms/input/NumberInput";

interface AddRoomFormContentProps {
  handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roomType: string;
  roomNumber: number;
  price: number;
}

const AddRoomFormContent = ({
  handleChangeForm,
  roomType,
  roomNumber,
  price,
}: AddRoomFormContentProps) => {
  return (
    <>
      <TextInput
        label="Room Type"
        placeholder={"Room Type"}
        id={"room_type"}
        handleChange={handleChangeForm}
        value={roomType}
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
        value={price}
        handleChange={handleChangeForm}
        required
      />
    </>
  );
};

export default AddRoomFormContent;

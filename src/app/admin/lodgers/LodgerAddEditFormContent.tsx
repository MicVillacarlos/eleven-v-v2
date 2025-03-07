import React from "react";
import TextInput from "../../components/Atoms/input/TextInput";
import SelectInput from "../../components/Atoms/input/SelectInput";
import NumberInput from "../../components/Atoms/input/NumberInput";
import DateInput from "../../components/Atoms/input/DateInput";
import { AddEditLodger } from "../../../lib/admin/api/lodgers/types";
import { GetRoomAvailablesObject } from "../../../lib/admin/api/room/types";

interface LodgerAddEditFormContentProps {
  handleChangeForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: AddEditLodger;
  availableRooms: GetRoomAvailablesObject[];
}

const LodgerAddEditFormContent = ({
  handleChangeForm,
  formData,
  availableRooms,
}: LodgerAddEditFormContentProps) => {
  const {
    birth_date,
    company_or_school,
    email,
    emergency_contact_number,
    emergency_contact_person,
    first_name,
    home_address,
    last_name,
    number_of_room_occupants,
    occupation,
    phone_number,
    room_id,
    sex,
  } = formData;

  const roomOccupants = [
    { _id: "1", value: "1", name: "1" },
    { _id: "2", value: "2", name: "2" },
    { _id: "3", value: "3", name: "3" },
    { _id: "4", value: "4", name: "4" },
    { _id: "5", value: "5", name: "5" },
  ];

  const sexOptions = [
    { _id: "1", value: "male", name: "Male" },
    { _id: "2", value: "female", name: "Female" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex gap-5">
        {/* ---------- column 1 Upper--------- */}
        <div className="flex flex-col w-1/2">
          <TextInput
            label="First Name"
            placeholder={"First Name"}
            id={"first_name"}
            handleChange={handleChangeForm}
            value={first_name}
            required
          />
          <DateInput
            handleChange={handleChangeForm}
            id="birth_date"
            placeholder="Birth Date"
            value={birth_date}
            label="Birth Date"
            required
          />
        </div>
        {/* ---------- column 2 Upper--------- */}
        <div className="flex flex-col w-1/2">
          <TextInput
            label="Last Name"
            placeholder={"Last Name"}
            id={"last_name"}
            handleChange={handleChangeForm}
            value={last_name}
            required
          />
          <SelectInput
            id="sex"
            options={sexOptions}
            label="Sex"
            placeHolder="Sex"
            onChange={handleChangeForm}
            value={sex}
          />
        </div>
      </div>
      <TextInput
        label="Home Address"
        placeholder={"Home Address"}
        id={"home_address"}
        handleChange={handleChangeForm}
        value={home_address}
        required
      />
      <div className="flex gap-5">
        {/* ---------- column 1--------- */}
        <div className="flex flex-col w-1/2">
          <NumberInput
            prefix="+63"
            label="Phone Number"
            placeholder={"Phone Number"}
            id={"phone_number"}
            handleChange={handleChangeForm}
            value={phone_number}
            required
          />
          <TextInput
            label="Emergency Contact Person"
            placeholder={"Emergency Contact Person"}
            id={"emergency_contact_person"}
            handleChange={handleChangeForm}
            value={emergency_contact_person}
            required
          />
          <TextInput
            label="Occupation"
            placeholder={"Occupation"}
            id={"occupation"}
            handleChange={handleChangeForm}
            value={occupation}
            required
          />
          <SelectInput
            id="number_of_room_occupants"
            options={roomOccupants}
            label="Number of Room Occupants"
            placeHolder="Number of Room Occupants"
            value={number_of_room_occupants}
            onChange={handleChangeForm}
          />
        </div>
        {/* ---------- column 2--------- */}
        <div className="flex flex-col w-1/2">
          <TextInput
            label="Email"
            placeholder={"Email"}
            id={"email"}
            handleChange={handleChangeForm}
            value={email}
            required
          />
          <NumberInput
            prefix="+63"
            label="Emergency Contact Number"
            placeholder={"Emergency Contact Number"}
            id={"emergency_contact_number"}
            handleChange={handleChangeForm}
            value={emergency_contact_number}
            required
          />
          <TextInput
            label="Company or School Name"
            placeholder={"Company or School Name"}
            id={"company_or_school"}
            handleChange={handleChangeForm}
            value={company_or_school}
            required
          />
          <SelectInput
            id="room_id"
            options={availableRooms}
            label="Room Number"
            placeHolder="Room Number"
            value={room_id}
            onChange={handleChangeForm}
          />
        </div>
      </div>
    </div>
  );
};

export default LodgerAddEditFormContent;

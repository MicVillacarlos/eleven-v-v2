"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AddEditBillFormData } from "../../../lib/admin/api/bills/types";
import SelectInput from "../../components/Atoms/input/SelectInput";
import DividerHorizontal from "../../components/Atoms/others/DividerHorizontal";
import {
  LodgerOption,
} from "../../../lib/admin/api/lodgers/types";
import { getLodgersOption } from "../../../lib/admin/api/lodgers/lodger";
import DateInput from "../../components/Atoms/input/DateInput";
import NumberInput from "../../components/Atoms/input/NumberInput";
import { moneyFormat } from "../../helpers/helpers";

interface BillAddEditFormContentProps {
  handleChangeForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: AddEditBillFormData;
}

const BillAddEditFormContent = ({
  handleChangeForm,
  formData,
}: BillAddEditFormContentProps) => {
  const [lodgersOptions, setLodgerOptions] = useState<LodgerOption[]>([
    { name: "", value: "", _id: "" },
  ]);

  const {
    type_of_bill,
    lodger_id,
    reading_start_date,
    reading_end_date,
    past_reading,
    present_reading,
    current_bill,
    monthly_given_bill,
    due_date,
    add_on
  } = formData;

  const billTypeOptions = [
    { _id: "1", value: "electricity", name: "Electricity" },
    { _id: "2", value: "water", name: "Water" },
    { _id: "3", value: "rent", name: "Rent" },
  ];

  const fetchLodgerOptions = async () => {
    const result = await getLodgersOption();
    setLodgerOptions(result);
  };

  useEffect(() => {
    fetchLodgerOptions();
  }, []);

  const calculateBill = useMemo(() => {
    if (
      present_reading &&
      past_reading &&
      current_bill &&
      monthly_given_bill &&
      add_on
    ) {
      const differenceReading = present_reading - past_reading;
      const billQuotient = current_bill / monthly_given_bill;
      const totalAddOn = billQuotient + add_on;

      const billAmount = differenceReading * totalAddOn;
      return moneyFormat(billAmount);
    } else {
      return 0;
    }
  }, [add_on, current_bill, monthly_given_bill, past_reading, present_reading]);
  
  const electricityWaterForm = (
    <div>
      <div className="flex w-full gap-5">
        <div className="w-1/2">
          <DateInput
            handleChange={handleChangeForm}
            id="reading_start_date"
            placeholder="Reading Start Date"
            value={reading_start_date}
            label="Reading Start Date"
            required
          />
          <DateInput
            handleChange={handleChangeForm}
            id="due_date"
            placeholder="Due Date"
            value={due_date}
            label="Due Date"
            required
          />
        </div>
        <div className="w-1/2">
          <DateInput
            handleChange={handleChangeForm}
            id="reading_end_date"
            placeholder="Reading End Date"
            value={reading_end_date}
            label="Reading End Date"
            required
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-1/2">
          <NumberInput
            label={type_of_bill === "electricity" ? "Present Kilowatt Reading" : "Present Meter Reading"}
            placeholder={type_of_bill === "electricity" ? "Present Kilowatt Reading" : "Present Meter Reading"}
            id={"present_reading"}
            handleChange={handleChangeForm}
            value={present_reading}
            required
          />
          <NumberInput
            prefix="₱"
            label="Current Bill"
            placeholder={"Current Bill"}
            id={"current_bill"}
            handleChange={handleChangeForm}
            value={current_bill}
            required
          />
          <NumberInput
            prefix="₱"
            label="Add On"
            placeholder={"Add On"}
            id={"add_on"}
            handleChange={handleChangeForm}
            value={add_on}
            required
          />
        </div>
        <div className="w-1/2">
          <NumberInput
            label={type_of_bill === "electricity" ? "Past Kilowatt Reading" : "Past Meter Reading"}
            placeholder={type_of_bill === "electricity" ? "Past Kilowatt Reading" : "Past Meter Reading"}
            id={"past_reading"}
            handleChange={handleChangeForm}
            value={past_reading}
            required
          />
          <NumberInput
            label="Monthly Given Bill"
            placeholder={"Monthly Given Bill"}
            id={"monthly_given_bill"}
            handleChange={handleChangeForm}
            value={monthly_given_bill}
            required
          />
        </div>
      </div>
      <DividerHorizontal />
      {calculateBill ? (
        <p className="font-semibold leading-none tracking-tight text-gray-900 text-base align-center">
          Bill Amount: {calculateBill}
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-5">
        <div className="w-1/2">
          <SelectInput
            id="type_of_bill"
            options={billTypeOptions}
            label="Bill Type"
            placeHolder="Bill Type"
            onChange={handleChangeForm}
            value={type_of_bill}
            required
          />
        </div>
        <div className="w-1/2">
          <SelectInput
            id="lodger_id"
            options={lodgersOptions}
            label="Lodger"
            placeHolder="Lodger"
            onChange={handleChangeForm}
            value={lodger_id}
            required
          />
        </div>
      </div>
      {type_of_bill && lodger_id && <DividerHorizontal />}
      {type_of_bill !== "rent" && lodger_id && electricityWaterForm}
    </div>
  );
};

export default BillAddEditFormContent;

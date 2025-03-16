"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AddEditBillFormData } from "../../../lib/admin/api/bills/types";
import SelectInput from "../../components/Atoms/input/SelectInput";
import DividerHorizontal from "../../components/Atoms/others/DividerHorizontal";
import { LodgerOption } from "../../../lib/admin/api/lodgers/types";
import { getLodgersOption } from "../../../lib/admin/api/lodgers/lodger-client";
import DateInput from "../../components/Atoms/input/DateInput";
import NumberInput from "../../components/Atoms/input/NumberInput";
import { moneyFormat } from "../../helpers/helpers";
import { config } from "../../../config/config";
import moment from "moment";

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
    past_reading_date,
    present_reading_date,
    past_reading,
    present_reading,
    current_bill,
    monthly_given_bill,
    due_date,
    add_on,
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
      const totalAddOn = billQuotient + Number(add_on);
      const billAmount = Math.round(differenceReading * totalAddOn * 100) / 100;
      return moneyFormat(billAmount);
    } else {
      return 0;
    }
  }, [add_on, current_bill, monthly_given_bill, past_reading, present_reading]);

  const electricityWaterForm = (
    <div>
      <DividerHorizontal />
      <div className="flex w-full gap-5">
        <div className="w-1/2">
          <DateInput
            handleChange={handleChangeForm}
            id="due_date"
            placeholder="Due Date"
            value={due_date}
            label="Due Date"
            minDate={moment().tz(config.timezone!).format("YYYY-MM-DD")}
            maxDate={moment()
              .tz(config.timezone!)
              .add(3, "month")
              .format("YYYY-MM-DD")}
            required
          />
        </div>
        <div className="w-1/2"></div>
      </div>
      <div className="flex w-full gap-5">
        <div className="w-1/2">
          <DateInput
            handleChange={handleChangeForm}
            id="past_reading_date"
            placeholder="Past Reading Date"
            value={past_reading_date}
            label="Past Reading Date"
            required
          />
          <NumberInput
            label={
              type_of_bill === "electricity"
                ? "Past Kilowatt Reading"
                : "Past Meter Reading"
            }
            placeholder={
              type_of_bill === "electricity"
                ? "Past Kilowatt Reading"
                : "Past Meter Reading"
            }
            id={"past_reading"}
            handleChange={handleChangeForm}
            value={past_reading}
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
          <DateInput
            handleChange={handleChangeForm}
            id="present_reading_date"
            placeholder="Present Reading Date"
            value={present_reading_date}
            label="Present Reading Date"
            required
          />
          <NumberInput
            label={
              type_of_bill === "electricity"
                ? "Present Kilowatt Reading"
                : "Present Meter Reading"
            }
            placeholder={
              type_of_bill === "electricity"
                ? "Present Kilowatt Reading"
                : "Present Meter Reading"
            }
            id={"present_reading"}
            handleChange={handleChangeForm}
            value={present_reading}
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
          {calculateBill ? (
            <div className="flex h-1/4 items-center">
              <p className="font-semibold leading-none tracking-tight text-gray-900 text-base align-center">
                Bill Amount: {calculateBill}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  const rentForm = (
    <div>
      <DividerHorizontal />
      <div className="flex w-full gap-5">
        <div className="w-1/2">
          <DateInput
            handleChange={handleChangeForm}
            id="due_date"
            placeholder="Due Date"
            value={due_date}
            label="Due Date"
            minDate={moment().tz(config.timezone!).format("YYYY-MM-DD")}
            maxDate={moment()
              .tz(config.timezone!)
              .add(3, "month")
              .format("YYYY-MM-DD")}
            required
          />
        </div>
        <div className="w-1/2"></div>
      </div>
      <div className="flex w-full gap-5">
        <div className="w-1/2">
          <DateInput
            handleChange={handleChangeForm}
            id="past_reading_date"
            placeholder="Start Date"
            value={past_reading_date}
            label="Start Date"
            required
          />
        </div>
        <div className="w-1/2">
          <DateInput
            handleChange={handleChangeForm}
            id="present_reading_date"
            placeholder="End Date"
            value={present_reading_date}
            label="End Date"
            required
          />
        </div>
      </div>
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
      {type_of_bill !== "rent" && lodger_id ? electricityWaterForm : null}
      {type_of_bill === "rent" && lodger_id ? rentForm : null}
    </div>
  );
};

export default BillAddEditFormContent;

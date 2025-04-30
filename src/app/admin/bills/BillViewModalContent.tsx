import React from "react";
import ViewTextLabel from "../../components/Atoms/text/ViewTextLabel";
import { Bill } from "../../../lib/admin/api/bills/types";
import { capitalizeFirstLetter, formatDate, moneyFormat } from "../../helpers/helpers";

interface BillViewModalContentProps {
  bill: Bill | null;
}

export const BillViewModalContent: React.FC<BillViewModalContentProps> = ({
  bill,
}) => {
  const isRentBill = bill?.type_of_bill === "Rent" ? true : false;
  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/2">
          <ViewTextLabel>Lodger Name:</ViewTextLabel>
          {bill?.lodger_full_name}
        </div>
        <div className="w-1/2">
          <ViewTextLabel>Room Number:</ViewTextLabel>
          {bill?.room_number}
        </div>
      </div>
      <div className="flex w-full mt-5">
        <div className="w-1/2">
          <ViewTextLabel>
            {isRentBill ? "From Date" : "Past Reading Date:"}
          </ViewTextLabel>
          {formatDate(bill?.past_reading_date as unknown as Date)}
        </div>

        <div className="w-1/2">
          <ViewTextLabel>
            {isRentBill ? "End Date" : "Latest Reading Date:"}
          </ViewTextLabel>
          {formatDate(bill?.present_reading_date as unknown as Date)}
        </div>
      </div>
      {!isRentBill && (
        <>
          <div className="flex w-full mt-5">
            <div className="w-1/2">
              <ViewTextLabel>Past Reading:</ViewTextLabel>
              {bill?.past_reading}
            </div>

            <div className="w-1/2">
              <ViewTextLabel>Latest Reading:</ViewTextLabel>
              {bill?.present_reading}
            </div>
          </div>
          <div className="flex w-full mt-5">
            <div className="w-1/2">
              <ViewTextLabel>Monthly Given Bill:</ViewTextLabel>
              {bill?.monthly_given_bill}
            </div>
          </div>
        </>
      )}

      <div className="mt-5 flex w-full">
        <div className="w-1/2">
          <ViewTextLabel>Bill Amount:</ViewTextLabel>
          {bill?.bill_amount && moneyFormat(bill?.bill_amount)}
        </div>
        <div className="w-1/2">
          <ViewTextLabel>Status:</ViewTextLabel>
          {capitalizeFirstLetter(bill?.status as string)}
        </div>
      </div>
    </div>
  );
};

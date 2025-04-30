"use client";
import React from "react";
import clsx from "clsx";

interface StatusSelectInputProps {
  id: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StatusSelectInput = ({
  id,
  value,
  onChange,
}: StatusSelectInputProps) => {

  const options = [
    { _id: "1", value: "unpaid", name: "Unpaid" },
    { _id: "2", value: "paid", name: "Paid" },
    { _id: "3", value: "overdue", name: "Overdue" },
  ];

  const bgColor =
    value === "unpaid"
      ? "bg-gray-500"
      : value === "paid"
      ? "bg-green-500"
      : value === "overdue"
      ? "bg-red-500"
      : null;

  return (
    <div>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={clsx(
          "h-8 w-full rounded-full border-r-8 border-transparent px-2 text-center text-sm outline outline-gray-300 text-white min-w-24",
          bgColor
        )}
      >
        {options.map((item) => (
          <option key={item._id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusSelectInput;

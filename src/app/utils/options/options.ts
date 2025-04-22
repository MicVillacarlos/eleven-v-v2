export interface FilterOption {
  id: number;
  value: string;
  label: string;
}

export interface FilterCategory {
  header: string;
  header_value: string;
  options: FilterOption[];
}

export const filterOptions = [
  {
    header: "Status",
    header_value: "status",
    options: [
      { id: 1, value: "paid", label: "Paid" },
      { id: 2, value: "unpaid", label: "Unpaid" },
      { id: 3, value: "overdue", label: "Overdue" },
    ],
  },
  {
    header: "Type of Bill",
    header_value: "type_of_bill",
    options: [
      { id: 1, value: "rent", label: "Rent" },
      { id: 2, value: "electricity", label: "Electricity" },
      { id: 3, value: "water", label: "Water" },
    ],
  },
];
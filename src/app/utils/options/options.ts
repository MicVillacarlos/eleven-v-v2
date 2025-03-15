export interface FilterOption {
  id: number;
  value: string;
  label: string;
}

export interface FilterCategory {
  header: string;
  options: FilterOption[];
}

export const filterOptions = [
  {
    header: "Status",
    options: [
      { id: 1, value: "paid", label: "Paid" },
      { id: 2, value: "unpaid", label: "Unpaid" },
      { id: 3, value: "overdue", label: "Overdue" },
    ],
  },
  {
    header: "Sort",
    options: [
      { id: 4, value: "-1", label: "Latest first" },
      { id: 5, value: "1", label: "Oldest first" },
    ],
  },
];
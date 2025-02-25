export interface Column<T> {
  key: keyof T;
  label: string;
  type?: "money";
  justify?: "center" | "left" | "right";
}

export interface TableProps<T> {
  isNoQuery?: boolean;
  data: T[];
  columns: Column<T>[];
  handleNextNavigation: () => void;
  handlePrevNavigation: () => void;
  onSelectTablePage: (page: number) => void;
  pagination: {
    current: number;
    limit: number;
    total: number;
  };
}

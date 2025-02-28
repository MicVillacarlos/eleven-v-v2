export interface Column<T> {
  key: keyof T;
  label: string;
  type?: "money";
  justify?: "center" | "left" | "right";
}

export interface TableProps<T> {
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
  onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEdit?: (arg0: T | string) => void;
  onClickDelete?: (arg0: T | string) => void;
  onClickView?: (arg0: T | string) => void;
}

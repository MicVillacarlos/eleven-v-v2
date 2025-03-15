import moment from "moment";
import { config } from "../../config/config";

export const paginationPages = (current: number, limit: number, total: number): number[] => {
  const totalPages = Math.ceil(total / limit);
  const maxPagesToShow = 5;

  let startPage = Math.max(1, current - 2);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};


export const moneyFormat = (number: number) => {
  return `₱${number.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ""; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const lowercaseFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const formatNumberToString = (number: number, prefix?: string) => {
  return prefix + number.toString();
};

export const formatStringToNumber = (string: string) => {
  return Number(string);
}

export const formatDate = (date: Date | string) => {
  return moment(date).tz(config.timezone!).format("MM-DD-YYYY");
};

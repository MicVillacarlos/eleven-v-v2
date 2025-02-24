import React from "react";
import { CheckIcon } from "../../svg/CheckIcon";
import CloseIcon from "../../svg/CloseIcon";
import { WarningIcon } from "../../svg/WarningIcon";

interface ToastProps {
  message: string;
  type: "success" | "danger" | "warning" | "";
  isShow: boolean;
}

const Toast = ({ message, type, isShow }: ToastProps) => {
  const icon = (() => {
    switch (type) {
      case "success":
        return <CheckIcon color="white" />;
      case "danger":
        return <CloseIcon size={15} className="text-white" />;
      case "warning":
        return <WarningIcon color="white" />;
      default:
        return null;
    }
  })();

  const toastClasses = {
    success: "bg-green-200 text-green-700",
    danger: "bg-red-200 text-red-700",
    warning: "bg-orange-200 text-orange-700",
    "": "",
  };

  const iconBgClasses = {
    success: "bg-green-400 text-white",
    danger: "bg-red-400 text-white",
    warning: "bg-orange-400 text-white",
    "": "",
  };

  return isShow ? (
    <div
      id={`toast-${type}`}
      className={`fixed top-4 right-4 z-50 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-lg ${toastClasses[type]}`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${iconBgClasses[type]}`}
      >
        {icon}
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
    </div>
  ) : null;
};

export default Toast;

import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "danger" | "warning";
}

const Toast = (props: ToastProps) => {
  const { message, type } = props;

  const icon = () => {
    switch (type) {
      case "success":
        return;
      case "danger":
        return;
      case "warning":
        return;
    }
  };

  return (
    <div
      id={`toast-${type}`}
      className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        {icon()}
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
    </div>
  );
};

export default Toast;

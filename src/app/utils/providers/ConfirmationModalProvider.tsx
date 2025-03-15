"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import ConfirmationModal from "../../components/Organisms/modal/ConfirmationModal";

interface ConfirmationModalContextProps {
  confirmationModal: (title: string, message: string, onConfirm: () => void) => void;
}

const ConfirmationModalContext = createContext<ConfirmationModalContextProps | undefined>(undefined);

export const ConfirmationModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(
    () => () => {}
  );
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const confirmationModal = useCallback(
    (title: string, message: string, onConfirm: () => void) => {
      setModalTitle(title);
      setModalMessage(message);
      setOnConfirmCallback(() => onConfirm);
      setIsShow(true);
    },
    []
  );

  return (
    <ConfirmationModalContext.Provider value={{ confirmationModal }}>
      {children}
      <ConfirmationModal
        isOpen={isShow}
        onCancelModalHandler={() => setIsShow(false)}
        onConfirmHandler={() => {
          onConfirmCallback();
          setIsShow(false);
        }}
        title={modalTitle}
        message={modalMessage}
      />
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error("useConfirmationModal must be used within a ConfirmationModalProvider");
  }
  return context;
};

"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import DeleteModal from "../../components/Organisms/modal/DeleteConfirmModal";

interface ConfirmDeleteModalContextProps {
  confirmDeleteModal: (onDelete: () => void) => void;
}

const ConfirmDeleteModalContext = createContext<ConfirmDeleteModalContextProps | undefined>(
  undefined
);

export const ConfirmDeleteModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [onDeleteCallback, setOnDeleteCallback] = useState<() => void>(() => () => {});

  const confirmDeleteModal = useCallback((onDelete: () => void) => {
    setIsShow(true);
    setOnDeleteCallback(() => onDelete);
  }, []);

  return (
    <ConfirmDeleteModalContext.Provider value={{ confirmDeleteModal }}>
      {children}
      <DeleteModal
        isOpen={isShow}
        onCancelModalHandler={() => setIsShow(false)}
        onDeleteModalHandler={() => {
          onDeleteCallback();
          setIsShow(false);
        }}
      />
    </ConfirmDeleteModalContext.Provider>
  );
};

export const useConfirmDeleteModal = () => {
  const context = useContext(ConfirmDeleteModalContext);
  if (!context) {
    throw new Error("useConfirmDeleteModal must be used within a ConfirmDeleteModalProvider");
  }
  return context;
};

import React, { JSX } from "react";
import CloseIcon from "../../svg/CloseIcon";

interface ModalPropsType {
  title: string;
  content: JSX.Element;
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmitForm: (e: React.FormEvent) => void;
}

const ModalForm = (props: ModalPropsType) => {
  const { title, content, isOpen, onCloseModal, onSubmitForm } = props;

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50`}
    >
      <div className={`relative p-4 w-full max-h-full max-w-xl`}>
        <div className="relative rounded-lg shadow-sm bg-white text-black">
          <form onSubmit={onSubmitForm}>
            <div className="flex items-center justify-between p-4 md:p-5">
              <h3 className="text-xl font-semibold">{title}</h3>
              {/* {--------------Close Button--------} */}
              <button
                type="button"
                className="text-black bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
                onClick={onCloseModal}
              >
                <CloseIcon size={15} />
              </button>
              {/* {----------------Close Button--------} */}
            </div>
            <div className="p-4 md:p-5 space-y-4">{content}</div>
            <div className="flex justify-end p-4 md:p-5 ">
              <button
                data-modal-hide="default-modal"
                type="submit"
                className="text-white bg-[#205072] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;

"use client";
import React, { JSX, Suspense, useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import { AddIcon } from "../../components/svg/AddIcon";
import dynamic from "next/dynamic";
import TableLoading from "../../components/Organisms/loaders/TableLoading";
import { Column, TableProps } from "../../components/Organisms/table/type";
import SearchInput from "../../components/Atoms/input/SearchInput";
import {
  addLodger,
  deleteLodger,
  getLodgerDetails,
  getLodgers,
  updateLodger,
} from "../../../lib/admin/api/lodgers/lodger-client";
import {
  AddEditLodger,
  FetchLodgerType,
} from "../../../lib/admin/api/lodgers/types";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import LodgerAddEditFormContent from "./LodgerAddEditFormContent";
import { useConfirmDeleteModal } from "../../utils/providers/ConfirmDeleteModalProvider";
import { useToastContext } from "../../utils/providers/ToastProvider";
import {
  formatNumberToString,
  formatStringToNumber,
} from "../../helpers/helpers";
import { getAvailableRooms } from "../../../lib/admin/api/room/room-client";
import { GetRoomAvailablesObject } from "../../../lib/admin/api/room/types";
import ModalView from "../../components/Organisms/modal/ModalView";
import { LodgerViewModalContent } from "./LodgerViewModalContent";
import moment from "moment";

//---Start---Note: Use dynamic(Next Js for Lazy Loading) for components fetching data. This is for optimization
const LodgersTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string }>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use dynamic(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Lodgers = ({
  initialLodgers,
  initialTotal,
}: {
  initialLodgers: FetchLodgerType[];
  initialTotal: number;
  }) => {
  const [mode, setMode] = useState<string>('add');
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: initialTotal,
  });
  const [lodgerDataTable, setLodgerDataTable] =
    useState<FetchLodgerType[]>(initialLodgers);
  
  const [query, setQuery] = useState<string>("");

  const [isViewAddEditFormModal, setIsViewAddEditFormModal] =
    useState<boolean>(false);

  const [availableRooms, setAvailableRooms] = useState<
    GetRoomAvailablesObject[]
  >([{ _id: "", value: "", name: "" }]);

  const [addEditLodgerData, setAddEditLodgerData] = useState<AddEditLodger>({
    first_name: "",
    last_name: "",
    birth_date: "",
    sex: "",
    home_address: "",
    phone_number: 0,
    email: "",
    emergency_contact_person: "",
    emergency_contact_number: 0,
    occupation: "",
    company_or_school: "",
    number_of_room_occupants: "",
    room_id: "",
    lodger_id: ""
  });

  /**
   **View Modal states --- START ---
   */
  const [viewLodgerData, setViewLodgerData] = useState<FetchLodgerType | null>(
    null
  );
  const [isViewLodgerModal, setIsViewLodgerModal] = useState<boolean>(false);
  /**
   **View Modal states --- END ---
   */

  const tableColumns: Column<FetchLodgerType>[] = [
    { key: "room_number", label: "Room Number" },
    { key: "full_name", label: "Full Name" },
    { key: "age", label: "Age", justify: "right" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone Number" },
  ];

  const { confirmDeleteModal } = useConfirmDeleteModal();
  const { showToast } = useToastContext();

  const fetchData = async () => {
    const { data, count } = await getLodgers(
      query,
      pagination.current,
      pagination.limit
    );
    setLodgerDataTable(data);
    setPagination((prevState) => ({
      ...prevState,
      total: count,
    }));
  };

  //------------ Prevents fetch in first render ------------
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, query]);
  //------------ Prevents fetch in first render ------------

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      const rooms = await getAvailableRooms();
      setAvailableRooms(rooms.data);
    };

    if (isViewAddEditFormModal) {
      fetchAvailableRooms();
    }
  }, [isViewAddEditFormModal]);

  // ------------------ TABLE FUNCTIONS --------------------

  const onClickAddLodger = () => {
    setMode('add')
    setIsViewAddEditFormModal(true);
  };

  const handleNextPagination = useCallback(() => {
    setPagination((prevState) => {
      const { total, limit, current } = prevState;
      const lastPage = Math.ceil(total / limit);
      return current < lastPage
        ? { ...prevState, current: current + 1 }
        : prevState;
    });
  }, []);

  const handlePrevPagination = useCallback(() => {
    setPagination((prevState) => ({
      ...prevState,
      current: Math.max(1, prevState.current - 1),
    }));
  }, []);

  const onSelectTablePage = useCallback((page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      current: page,
    }));
  }, []);

  const onSearchTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetAddEditLodgerData = () => {
    setAddEditLodgerData({
      first_name: "",
      last_name: "",
      birth_date: "",
      sex: "",
      home_address: "",
      phone_number: 0,
      email: "",
      emergency_contact_person: "",
      emergency_contact_number: 0,
      occupation: "",
      company_or_school: "",
      number_of_room_occupants: "",
      room_id: "",
      lodger_id: ""
    });
    setIsViewAddEditFormModal(false);
  };

  const onConfirmDeleteLodger = async (id: string) => {
    try {
      const result = await deleteLodger(id);
      if (result.data) {
        showToast("User successfully deleted.", "success");
        await fetchData();
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
  };

  const onClickDeleteLodgerTable = (data: string | FetchLodgerType) => {
    const { _id } = data as FetchLodgerType;
    confirmDeleteModal(() => onConfirmDeleteLodger(_id));
  };

  const onClickEditLodgerTable = async (lodger: string | FetchLodgerType) => {
    const { data } = await getLodgerDetails((lodger as FetchLodgerType)._id);
    const emergencyContactNumber = Number(
      data.emergency_contact_number.slice(3)
    );
    const lodgerContactNumber = Number(data.phone_number.slice(3));
    const birthday = moment(data.birth_date).format("yyyy-MM-DD");

    setAddEditLodgerData({
      ...data,
      emergency_contact_number: emergencyContactNumber,
      phone_number: lodgerContactNumber,
      birth_date: birthday,
      room_id: data.room_details._id,
      lodger_id: data._id,
    });
    setMode("edit");
    setIsViewAddEditFormModal(true);
  };

  const onHandleChangeform = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAddEditLodgerData({
      ...addEditLodgerData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmitModalForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      birth_date,
      sex,
      home_address,
      phone_number,
      email,
      emergency_contact_person,
      emergency_contact_number,
      occupation,
      company_or_school,
      number_of_room_occupants,
      room_id,
      lodger_id
    } = addEditLodgerData;

    try {
      if (mode === 'edit') {
        const result = await updateLodger(
          lodger_id ?? "",
          first_name,
          last_name,
          birth_date,
          sex,
          home_address,
          formatNumberToString(phone_number, "+63"),
          email,
          emergency_contact_person,
          formatNumberToString(emergency_contact_number, "+63"),
          occupation,
          company_or_school,
          formatStringToNumber(number_of_room_occupants),
          room_id
        );

        if (result.user) {
          showToast("Successfully updated a Lodger.", "success");
          resetAddEditLodgerData();
          setMode('add');
          fetchData();
        }
      } else {
        const result = await addLodger(
          first_name,
          last_name,
          birth_date,
          sex,
          home_address,
          formatNumberToString(phone_number, "+63"),
          email,
          emergency_contact_person,
          formatNumberToString(emergency_contact_number, "+63"),
          occupation,
          company_or_school,
          formatStringToNumber(number_of_room_occupants),
          room_id
        );
        if (result.user) {
          showToast("Successfully added a new Lodger.", "success");
          resetAddEditLodgerData();
          fetchData();
        }
      }

    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
  };

  const onCloseModalForm = useCallback(() => {
    resetAddEditLodgerData();
  }, []);

  /**
   ** View Modal Functions --- Start ---
   */
  const onClickViewLodgerTable = (data: FetchLodgerType | string) => {
    setViewLodgerData(data as FetchLodgerType);
    setIsViewLodgerModal(true);
  };

  const onCloseViewModal = () => {
    setIsViewLodgerModal(false);
    setViewLodgerData(null);
  };
  /**
   ** View Modal Functions --- End ---
   */
  return (
    <Layout>
      {/* -------------- Header Table --------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl> Lodgers Management </Text3xl>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onClickAddLodger}>
            <AddIcon color="white" />
            Add Lodger
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header Table --------------*/}
      <div className="flex w-full justify-between mb-6 items-center gap-5 mb-5">
        <div className="md:w-1/4">
          <SearchInput placeHolder="Search Name" onChangeSearch={onSearchTable} />
        </div>
      </div>
      <Suspense fallback={<TableLoading />}>
        <LodgersTable
          data={lodgerDataTable ?? []}
          columns={tableColumns}
          handleNextNavigation={handlePrevPagination}
          handlePrevNavigation={handleNextPagination}
          onSelectTablePage={onSelectTablePage}
          pagination={pagination}
          onClickDelete={onClickDeleteLodgerTable}
          onClickEdit={onClickEditLodgerTable}
          onClickView={onClickViewLodgerTable}
        />
      </Suspense>

      <ModalForm
        content={
          <LodgerAddEditFormContent
            mode={mode}
            handleChangeForm={onHandleChangeform}
            formData={addEditLodgerData}
            availableRooms={availableRooms}
          />
        }
        isOpen={isViewAddEditFormModal}
        onSubmitForm={onSubmitModalForm}
        onCloseModal={onCloseModalForm}
        title={mode === 'add' ? "Add Lodger" : "Edit Lodger"}
        key={"add_edit_lodger"}
      />

      {/**
       **View Modal for Lodger
       */}
      <ModalView
        title={viewLodgerData?.full_name}
        content={<LodgerViewModalContent lodger={viewLodgerData} />}
        isOpen={isViewLodgerModal}
        onCloseModal={onCloseViewModal}
      />
    </Layout>
  );
};

export default Lodgers;

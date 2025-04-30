"use client"
import React, { JSX, Suspense, useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import { AddIcon } from "../../components/svg/AddIcon";
import TableLoading from "../../components/Organisms/loaders/TableLoading";
import dynamic from "next/dynamic";
import { Column, TableProps } from "../../components/Organisms/table/type";
import SearchInput from "../../components/Atoms/input/SearchInput";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import BillAddEditFormContent from "./BillAddEditFormContent";
import { AddEditBillFormData, Bill } from "../../../lib/admin/api/bills/types";
import { useConfirmDeleteModal } from "../../utils/providers/ConfirmDeleteModalProvider";
import { useToastContext } from "../../utils/providers/ToastProvider";
import { createBill, deleteBill, fetchBills, sendBillOverdueNotification, updateStatusBill } from "../../../lib/admin/api/bills/bills-client";
import FilterTableButton from "../../components/Molecules/filters/FilterTableButton";
import { useConfirmationModal } from "../../utils/providers/ConfirmationModalProvider";
import { filterOptions } from "../../utils/options/options";
import { useRouter } from "next/navigation";
import { LodgerOption } from "../../../lib/admin/api/lodgers/types";
import ModalView from "../../components/Organisms/modal/ModalView";
import { BillViewModalContent } from "./BillViewModalContent";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const BillsTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string; }>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Bills = ({
  initialBills,
  initialTotal,
  lodgerOptions,
}: {
  initialBills: Bill[];
  initialTotal: number;
  lodgerOptions: LodgerOption[];
}) => {
  const [isViewAddEditBillModal, setIsViewAddEditBillModal] =
    useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [billsTableData, setBillsTableData] = useState<Bill[]>(initialBills);
  const [viewBillData, setViewBillData] = useState<Bill | null>(null);
  const [isViewBillModal, setIsViewBillModal] = useState<boolean>(false);

  const [billAddEditData, setBillAddEditData] = useState<AddEditBillFormData>({
    type_of_bill: "",
    lodger_id: "",
    past_reading_date: "",
    present_reading_date: "",
    present_reading: 0,
    past_reading: 0,
    current_bill: 0,
    monthly_given_bill: 0,
    add_on: 0,
    due_date: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: initialTotal,
  });

  const [filter, setFilter] = useState<{ [key: string]: string }>({
    status: "",
    type_of_bill: "",
  });

  const tableColumns: Column<Bill>[] = [
    { key: "bill_number", label: "Bill No." },
    { key: "room_number", label: "Room" },
    {
      key: "lodger_full_name",
      label: "Lodger Name",
    },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "type_of_bill", label: "Bill Type" },
    { key: "status", label: "Status", type: "status_select" },
    {
      key: "email_sent_status",
      label: "Email Reminder",
      type: "email_sent_status",
    },
    { key: "bill_amount", label: "Amount", type: "money", justify: "right" },
  ];

  const { confirmDeleteModal } = useConfirmDeleteModal();
  const { showToast } = useToastContext();
  const { confirmationModal } = useConfirmationModal();

  const resetAddEditBillData = () => {
    setBillAddEditData({
      type_of_bill: "",
      lodger_id: "",
      past_reading_date: "",
      present_reading_date: "",
      present_reading: 0,
      past_reading: 0,
      current_bill: 0,
      monthly_given_bill: 0,
      add_on: 0,
      due_date: "",
    });
  };

  const router = useRouter();
  // ------------------ TABLE FUNCTIONS --------------------

  const fetchData = async () => {
    const { data, count } = await fetchBills(
      query,
      pagination.current,
      pagination.limit,
      filter.status,
      filter.type_of_bill
    );
    setBillsTableData(data);
    setPagination((prevState) => ({
      ...prevState,
      total: count,
    }));
  };

  //--Prevents fetch in first render
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchData();
  }, [pagination.current, query, filter]);
  //--Prevents fetch in first render

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

  const onSelectTableFilter = (filter: Record<string, string>) => {
    const { status, type_of_bill } = filter;
    if (status) {
      setPagination((prevState) => ({
        ...prevState,
        current: 1,
      }));
      setFilter((prevState) => ({
        ...prevState,
        status,
      }));
    }

    if (type_of_bill) {
      setPagination((prevState) => ({
        ...prevState,
        current: 1,
      }));
      setFilter((prevState) => ({
        ...prevState,
        type_of_bill,
      }));
    }
  };

  const onSearchTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onAddEditBill = () => {
    setIsViewAddEditBillModal(true);
  };

  const onCloseAddEditBillModal = () => {
    setIsViewAddEditBillModal(false);
    resetAddEditBillData();
  };

  const onConfirmDeleteBill = async (id: string) => {
    try {
      const result = await deleteBill(id);
      if (result.data) {
        showToast("Bill successfully deleted.", "success");
        await fetchData();
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
  };

  const onClickDeleteBillTable = (data: string | Bill) => {
    const { _id } = data as Bill;
    confirmDeleteModal(() => onConfirmDeleteBill(_id));
  };

  const onClickMessageBillTable = async (data: string | Bill) => {
    if (typeof data === "string") {
      console.error(
        "Invalid data: Expected a Bill object but received a string"
      );
      return;
    }

    const { lodger_id, email_sent_status, bill_number, status, _id } = data;

    if (status === "overdue") {
      const sendOverdueMail = await sendBillOverdueNotification(lodger_id, _id);

      if (sendOverdueMail.success) {
        showToast(
          "A Notification message has already been sent successfully.",
          "success",
          5
        );
        return;
      } else {
        showToast(sendOverdueMail.message, "success", 5);
        return;
      }
    }

    if (!email_sent_status) {
      router.push(`/admin/bills/${bill_number}/${lodger_id}`);
    } else {
      showToast(
        "A Notification message has already been sent. You can't send another message",
        "warning",
        5
      );
    }
  };

  const onSubmitAddEditBill = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      add_on,
      current_bill,
      due_date,
      lodger_id,
      monthly_given_bill,
      past_reading,
      present_reading,
      present_reading_date,
      past_reading_date,
      type_of_bill,
    } = billAddEditData;
    try {
      const result = await createBill(
        due_date,
        past_reading,
        present_reading,
        current_bill,
        monthly_given_bill,
        type_of_bill,
        add_on,
        present_reading_date,
        past_reading_date,
        lodger_id
      );

      if (result.success) {
        showToast("Bill added successfully!", "success");
        resetAddEditBillData();
        setIsViewAddEditBillModal(false);
        fetchData();
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger");
    }
  };

  const onHandleChangeform = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBillAddEditData({
      ...billAddEditData,
      [e.target.id]: e.target.value,
    });
  };

  const onChangeSelectStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    bill_id?: string
  ) => {
    if (!bill_id) {
      showToast("Invalid bill ID.", "danger");
      return;
    }

    const status = e.target.value;

    confirmationModal(
      "Confirm Status Change",
      "Are you sure you want to update the bill status?",
      async () => {
        try {
          const result = await updateStatusBill(bill_id, status);
          if (result.bill) {
            fetchData();
            showToast("Bill status successfully updated!", "success");
          }
        } catch (error) {
          const errorMessage =
            (error as { message?: string })?.message ||
            "An unexpected error occurred.";
          showToast(errorMessage, "danger");
        }
      }
    );
  };

  const onCloseViewModal = () => {
    setIsViewBillModal(false);
    setViewBillData(null);
  };


  const onClickView = (data: string | Bill) => {
    setIsViewBillModal(true)
    setViewBillData(data as Bill)
  };

  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl> Bills Management </Text3xl>
        <div className="lg:w-[150px]">
          <PrimaryButton onClick={onAddEditBill}>
            <AddIcon color="white" />
            Add Bill
          </PrimaryButton>
        </div>
      </div>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between mb-6 items-center gap-5 mb-5">
        <div className="md:w-1/4">
          <SearchInput
            placeHolder="Search Name"
            onChangeSearch={onSearchTable}
          />
        </div>
        <div className="lg:w-[150px]">
          <FilterTableButton
            onSelectFilter={onSelectTableFilter}
            options={filterOptions}
            filterValue={filter}
            onClickReset={() =>
              setFilter({
                status: "",
                type_of_bill: "",
              })
            }
          />
        </div>
      </div>

      <Suspense fallback={<TableLoading />}>
        <BillsTable
          data={billsTableData ?? []}
          columns={tableColumns ?? []}
          handleNextNavigation={handlePrevPagination}
          handlePrevNavigation={handleNextPagination}
          onSelectTablePage={onSelectTablePage}
          pagination={pagination}
          onClickView={onClickView}
          onClickMessage={onClickMessageBillTable}
          onClickDelete={onClickDeleteBillTable}
          onChangeSelectStatus={onChangeSelectStatus}
        />
      </Suspense>
      <ModalForm
        title={"Add Bill"}
        content={
          <BillAddEditFormContent
            lodgerOptions={lodgerOptions}
            handleChangeForm={onHandleChangeform}
            formData={billAddEditData}
          />
        }
        isOpen={isViewAddEditBillModal}
        onCloseModal={onCloseAddEditBillModal}
        onSubmitForm={onSubmitAddEditBill}
      />

      {/**
       **View Modal for Lodger
       */}
      <ModalView
        title={viewBillData?.bill_number}
        content={<BillViewModalContent bill={viewBillData} />}
        isOpen={isViewBillModal}
        onCloseModal={onCloseViewModal}
      />
    </Layout>
  );
};

export default Bills;

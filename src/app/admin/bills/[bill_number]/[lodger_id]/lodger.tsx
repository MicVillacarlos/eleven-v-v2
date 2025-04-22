"use client";
import dynamic from "next/dynamic";
import { useParams, useRouter } from 'next/navigation';
import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchBillsMessaging, sendBillNotification } from "../../../../../lib/admin/api/bills/bills-client";
import { Bill } from "../../../../../lib/admin/api/bills/types";
import PrimaryButton from "../../../../components/Atoms/buttons/PrimaryButton";
import DividerHorizontal from "../../../../components/Atoms/others/DividerHorizontal";
import Text3xl from "../../../../components/Atoms/text/Text3xl";
import TextLarge from "../../../../components/Atoms/text/TextLarge";
import Layout from "../../../../components/Organisms/layout/Layout";
import TableLoading from "../../../../components/Organisms/loaders/TableLoading";
import {
  Column,
  TableProps,
} from "../../../../components/Organisms/table/type";
import SendIcon from "../../../../components/svg/SendIcon";
import { billNumbersFiltered, moneyFormat } from "../../../../helpers/helpers";
import SecondaryButton from "../../../../components/Atoms/buttons/SecondaryButton";
import { useToastContext } from "../../../../utils/providers/ToastProvider";

//---Start---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization
const BillTable = dynamic(
  () => import("../../../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string }>(props: TableProps<T>) => JSX.Element;
//---End---Note: Use `dynamic`(Next Js for Lazy Loading) for components fetching data. This is for optimization

const Lodger = ({
  initialBills,
  initialTotal,
  billSelected,
}: {
  initialBills: Bill[];
  initialTotal: number;
  billSelected: Bill[];
}) => {
  const params = useParams();
  const [billsTableData, setBillsTableData] = useState<Bill[]>(initialBills);
  const [billSelectedData, setBillSelectedData] = useState<Bill[]>(billSelected);
  const [billNumberSelected, setBillNumberSelected] = useState<number[]>(billNumbersFiltered(params.bill_number as string));

  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: initialTotal,
  });
  
  const router = useRouter()
  const { showToast } = useToastContext();

  const billTableColumns: Column<Bill>[] = [
    { key: "bill_number", label: "Bill No." },
    { key: "room_number", label: "Room" },
    {
      key: "lodger_full_name",
      label: "Lodger Name",
    },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "type_of_bill", label: "Bill Type" },
    { key: "status", label: "Status" },
    { key: "bill_amount", label: "Amount", type: "money", justify: "right" },
  ];

  const selectedBillTableColumns: Column<Bill>[] = [
    { key: "bill_number", label: "Bill No." },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "type_of_bill", label: "Type" },
    { key: "bill_amount", label: "Amount", type: "money", justify: "right" },
  ];

  const fetchData = async () => {
    const result = await fetchBillsMessaging(
      billNumberSelected,
      params.lodger_id as string,
      pagination.current,
      pagination.total
    );

    setBillsTableData(result.data);
    setBillSelectedData(result.bill_selected);
  };

  //------------ Prevents fetch in first render ------------
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchData();
  }, [pagination.current, billNumberSelected]);
  //------------ Prevents fetch in first render ------------
  
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

  const onClickCheckbox = (data: Bill | string) => {
    const { bill_number } = data as Bill;

    const billNumber = Number(bill_number.slice(2));
    setBillNumberSelected((prevSelected) => {
      if (prevSelected.includes(billNumber)) {
        return prevSelected.filter((num) => num !== billNumber);
      } else {
        return [...prevSelected, billNumber];
      }
    });

  };

  const onClickResetButton = () => {
    setBillNumberSelected(billNumbersFiltered(params.bill_number as string));
  };

  const onSendBillHandler = async () => {
    try {
      const result = await sendBillNotification(
        params.lodger_id as string,
        billNumberSelected
      );

      if (result.success) {
        showToast("Bill Notification successfully sent.", "success");
        router.push("/admin/bills");
      }
    } catch (error) {
      const errorMessage =
      (error as { message?: string })?.message ||
      "An unexpected error occurred.";
    showToast(errorMessage, "danger");
    }
  };

  const totalBillAmount = useMemo(() => {
    return billSelectedData.reduce((total, bill) => total + bill.bill_amount, 0);
  }, [billSelectedData]);

  return (
    <Layout>
      {/* -------------- Header Table--------------*/}
      <div className="flex w-full justify-between items-center mb-3">
        <Text3xl>Send Bill Notification</Text3xl>
      </div>
      <div className="flex gap-1 items-center mb-5">
        <p className="text-gray-900"> You are about to send this bill to</p>
        <TextLarge>{billSelectedData[0].lodger_full_name}</TextLarge>
      </div>
      <p className="text-gray-900 mb-2"> Email Preview:</p>
      <div className="p-10 bg-white">
        <p className="text-gray-500 text-sm italic">
          Dear {billSelectedData[0].lodger_full_name},
        </p>
        <p className="text-gray-500 my-6 text-sm italic">
          Your monthly bill/s is as follows:
        </p>
        <BillTable
          data={billSelectedData}
          columns={selectedBillTableColumns}
          isNoPagination
          handleNextNavigation={function (): void {
            throw new Error("Function not implemented.");
          }}
          handlePrevNavigation={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSelectTablePage={function (): void {
            throw new Error("Function not implemented.");
          }}
          pagination={{
            current: 0,
            limit: 0,
            total: 0,
          }}
        />
        <div className="w-full flex justify-end p-6 gap-5">
          <p className="text-gray-500 text-base">TOTAL:</p>
          <p className="text-gray-500 text-base">
            {moneyFormat(totalBillAmount)}
          </p>
        </div>
        <p className="text-gray-500 mt-10 text-sm italic">
          Please settle your bill.
        </p>
        <DividerHorizontal />
        <p className="text-gray-500 text-sm italic">
          Eleven-V, All rights reserved.
        </p>
      </div>
      <div className="flex justify-end mb-24 gap-3">
        {billSelectedData.length > 1 && (
          <div className="w-250 mt-5">
            <SecondaryButton onClick={onClickResetButton}>
              Reset
            </SecondaryButton>
          </div>
        )}
        <div className="w-250 mt-5">
          <PrimaryButton onClick={onSendBillHandler}>
            Send Bill <SendIcon size={18} />
          </PrimaryButton>
        </div>
      </div>
      {billsTableData.length && (
        <>
          <div>
            <p className="text-gray-900">
              To attach additional bills, simply click on the ones you want to
              include from the table below.
            </p>
          </div>

          {/* -------------- Header Table--------------*/}
          <div className="flex w-full justify-between mb-6 items-center gap-5 mb-5"></div>
          <BillTable
            data={billsTableData}
            columns={billTableColumns}
            handleNextNavigation={handleNextPagination}
            handlePrevNavigation={handlePrevPagination}
            onSelectTablePage={onSelectTablePage}
            pagination={pagination}
            onClickCheckbox={onClickCheckbox}
            selectedBillNumbers={billNumberSelected}
          />
        </>
      )}
    </Layout>
  );
};

export default Lodger
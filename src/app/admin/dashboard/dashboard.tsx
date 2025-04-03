"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import { billChartDataType } from "../../../lib/admin/api/dashboard/types";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { capitalizeFirstLetter } from "../../helpers/helpers";
import moment from "moment";

const Dashboard = ({
  name,
  billChartData,
}: {
  name: string;
  billChartData: billChartDataType[];
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const customLabel = (billChartData: billChartDataType[]) => {
    return billChartData.map((item, index) => (
      <div key={index} className="z-100 flex gap-3 items-center">
        <div
          className="h-8 w-2 rounded"
          style={{ backgroundColor: item.color }}
        />

        <p className="text-gray-500 text-xl font-extrabold">{item.value}</p>
        <p className="text-gray-500 text-base">
          {capitalizeFirstLetter(item.label)}
        </p>
      </div>
    ));
  };

  return (
    <Layout isNoPadding>
      <div className="bg-[#205072] w-full h-[140px] p-5 flex flex-col justify-center gap-2">
        <Text3xl color="text-white">{`Welcome back, ${name}!`}</Text3xl>
        <p className="text-white">Here are today&apos;s Summary of Reports.</p>
      </div>

      <div className="pt-10 flex flex-col items-center">
        <p className="text-gray-500 text-base">Monday - April 1, 2025</p>
      </div>

      <div className="p-5">
        {isClient && billChartData?.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-5 w-full">
            <div className="border bg-white w-50% mt-5 rounded-[5px]">
              <div className="flex flex-col">
                <div className="flex justify-center items-center mt-5">
                  <p className="text-gray-500 text-base">
                    Rooms - {moment().format("MMMM YYYY")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <PieChart width={260} height={200}>
                    <Pie
                      data={billChartData}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      animationDuration={500}
                    >
                      {billChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <div className="flex-col flex w-1/2 justify-center gap-4 pl-5">
                    {customLabel(billChartData)}
                  </div>
                </div>
              </div>
            </div>

            <div className="border bg-white w-50% mt-5 rounded-[5px]">
              <div className="flex flex-col">
                <div className="flex justify-center items-center mt-5">
                  <p className="text-gray-500 text-base">
                    Bills Overview - {moment().format("MMMM YYYY")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <PieChart width={260} height={200}>
                    <Pie
                      data={billChartData}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      animationDuration={500}
                    >
                      {billChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <div className="flex-col flex w-1/2 justify-center gap-4 pl-5">
                    {customLabel(billChartData)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">No data available</p>
        )}
      </div>

      <div className="bg-white p-5 flex flex-col mx-auto gap-2 w-[250px] rounded-md shadow">
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-base font-semibold">
            Birthday Celebrants:
          </p>
        </div>
        <p className="text-gray-500 text-base">Helena Eagan</p>
        <p className="text-gray-500 text-base">Helley R</p>
        <p className="text-gray-500 text-base">Britt Lower</p>
      </div>
    </Layout>
  );
};

export default Dashboard;

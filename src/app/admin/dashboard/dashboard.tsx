"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import { billChartDataType } from "../../../lib/admin/api/dashboard/types";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { capitalizeFirstLetter } from "../../helpers/helpers";

const Dashboard = ({
  name,
  billChartData,
  roomData,
  dayString,
  day,
  year,
  month,
}: {
  name: string;
  billChartData: billChartDataType[];
  roomData: billChartDataType[];
  dayString: string;
  month: string;
  day: string;
  year: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const customLabel = (data: billChartDataType[]) => {
    return data.map((item, index) => (
      <div key={index} className="z-100 flex gap-5 items-center">
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

  const renderPieChart = (data: billChartDataType[]) => {
    return (
      <PieChart width={280} height={290}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={3}
          animationDuration={500}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  };

  return (
    <Layout isNoPadding>
      <div className="bg-[#205072] w-full h-[140px] p-5 flex flex-col justify-center gap-2">
        <Text3xl color="text-white">{`Welcome back, ${name}!`}</Text3xl>
        <p className="text-white">Here are today&apos;s Summary of Reports.</p>
      </div>

      <div className="pt-5 flex flex-col items-center">
        <p className="text-gray-500 text-base">{`${dayString} - ${month} ${day}, ${year}`}</p>
      </div>

      <div className="px-5">
        {isClient && (billChartData.length > 0 || roomData.length > 0) ? (
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="border bg-white w-full lg:w-1/2 mt-5 rounded-[5px]">
              <div className="flex flex-col">
                <div className="flex justify-center items-center mt-5">
                  <p className="text-gray-500 text-base font-semibold">
                    Rooms - {month} {year}
                  </p>
                </div>
                <div className="flex justify-between">
                  {renderPieChart(roomData)}
                  <div className="flex-col flex w-1/2 justify-center gap-4 pl-5">
                    {customLabel(roomData)}
                  </div>
                </div>
              </div>
            </div>

            <div className="border bg-white w-full lg:w-1/2 mt-5 rounded-[5px]">
              <div className="flex flex-col">
                <div className="flex justify-center items-center mt-5">
                  <p className="text-gray-500 text-base font-semibold">
                    Bills Overview - {month} {year}
                  </p>
                </div>
                <div className="flex justify-between">
                  {renderPieChart(billChartData)}
                  <div className="flex-col flex w-1/2 justify-center gap-4 pl-5">
                    {customLabel(billChartData)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div className="w-full h-[200px] flex justify-center items-center">
              <p className="text-gray-500">No Data Available</p>
            </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

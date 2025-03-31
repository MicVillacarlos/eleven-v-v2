"use client"
import React from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import { billChartDataType } from "../../../lib/admin/api/dashboard/types";
import { Pie, PieChart } from "recharts";

const Dashboard = ({
  name,
  billChartData,
}: {
  name: string;
  billChartData: billChartDataType[];
}) => {
  return (
    <Layout isNoPadding>
      <div className="bg-[#205072] w-full h-[100px] p-5 flex items-center">
        <Text3xl color="text-white">{`Welcome, ${name}!`}</Text3xl>
      </div>

      <PieChart width={730} height={250}>
        <Pie
          data={billChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
      </PieChart>
    </Layout>
  );
};

export default Dashboard;

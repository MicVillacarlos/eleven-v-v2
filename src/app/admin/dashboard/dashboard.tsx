"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";
import { billChartDataType } from "../../../lib/admin/api/dashboard/types";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";

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

  return (
    <Layout isNoPadding>
      <div className="bg-[#205072] w-full h-[100px] p-5 flex items-center">
        <Text3xl color="text-white">{`Welcome, ${name}!`}</Text3xl>
      </div>

      {isClient && (
        <PieChart width={400} height={300}>
          <Pie
            data={billChartData}
            dataKey="value"
            nameKey="label"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
          >
            {billChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </Layout>
  );
};

export default Dashboard;

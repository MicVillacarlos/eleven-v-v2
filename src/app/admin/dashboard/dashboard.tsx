"use client"
import React from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Text3xl from "../../components/Atoms/text/Text3xl";

const Dashboard = () => {
  return (
    <Layout isNoPadding>
      <div className="bg-[#205072] w-full h-[100px] p-4 flex items-center">
        <Text3xl color="text-white"> Welcome</Text3xl>
      </div>
    </Layout>
  );
};

export default Dashboard;

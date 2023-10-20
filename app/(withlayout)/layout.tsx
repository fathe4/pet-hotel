"use client";

import { Layout } from "antd";
import Contents from "../components/dashboard/Contents";
import SideBar from "../components/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sss">
      <Layout className="py-0">
        <SideBar />
        <Contents>{children}</Contents>
      </Layout>
    </div>
  );
};

export default DashboardLayout;

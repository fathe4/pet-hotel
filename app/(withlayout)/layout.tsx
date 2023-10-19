"use client";

import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import Contents from "../components/dashboard/Contents";
import SideBar from "../components/dashboard/Sidebar";
import Loader from "../components/Loader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   useEffect(() => {
  //     if (!userLoggedIn) {
  //       router.push("/login");
  //     }
  //     setIsLoading(true);
  //   }, [router, isLoading]);

  if (!isLoading) {
    return <Loader />;
  }

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

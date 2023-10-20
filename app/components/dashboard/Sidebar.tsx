"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { sidebarItems } from "@/constants/sidebaritems";
import { useGetUserDetailsQuery } from "@/redux/api/authApi";
import Loader from "../Loader";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: currentUser, isLoading } = useGetUserDetailsQuery(undefined);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(currentUser?.role)}
      />
    </Sider>
  );
};

export default SideBar;

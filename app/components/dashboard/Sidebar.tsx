"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { sidebarItems } from "@/constants/sidebaritems";
import { useGetUserDetailsQuery } from "@/redux/api/authApi";
import Loader from "../Loader";
import { Nunito } from "next/font/google";
import { Session } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";

const { Sider } = Layout;

const font = Nunito({
  subsets: ["latin"],
});

const SideBar = ({ currentUser }: { currentUser: Session }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className={font.className}
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
        className={`font-semibold`}
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(currentUser?.role)}
      />
    </Sider>
  );
};

export default SideBar;

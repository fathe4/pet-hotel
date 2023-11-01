"use client";
import { Layout } from "antd";
import { Nunito } from "next/font/google";

const { Content } = Layout;

const font = Nunito({
  subsets: ["latin"],
});

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      className={`text-xm ${font.className}`}
      style={{
        minHeight: "100vh",
        // color: "black",
      }}
    >
      <div
        className={`text-lg ${font.className}`}
        style={{
          padding: "10px",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default Contents;

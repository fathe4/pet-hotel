import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Layout } from "antd";
import { getServerSession } from "next-auth";
import { Nunito } from "next/font/google";
import Contents from "../components/dashboard/Contents";
import SideBar from "../components/dashboard/Sidebar";
import { Session } from "../types";

const font = Nunito({
  subsets: ["latin"],
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: Session | null = await getServerSession(authOptions);

  if (!currentUser) {
    return;
  }
  return (
    <div className="sss">
      <Layout className={`pt-2 ${font.className}`}>
        <SideBar currentUser={currentUser} />
        <Contents>{children}</Contents>
      </Layout>
    </div>
  );
}

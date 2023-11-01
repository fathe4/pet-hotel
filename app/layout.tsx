import { Nunito } from "next/font/google";

import "./globals.css";

import ToastProvider from "./providers/ToasterProvider";
// Components
import Navbar from "./components/navbar";
import ClientOnly from "./components/ClientOnly";
// Modals
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import NextAuthProvider from "./providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = {
  title: "Pet Hotel | Home",
  description: "Pet Hotel",
  icon: {
    url: "/favicon.png",
    type: "image/png",
  },
  shortcut: { url: "/favicon.png", type: "image/png" },
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: any = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly currentUser={currentUser}>
          <StyledComponentsRegistry>
            <ToastProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <SearchModal />
            <Navbar currentUser={currentUser} />
            <div className="pt-20">{children}</div>
          </StyledComponentsRegistry>
        </ClientOnly>
      </body>
    </html>
  );
}

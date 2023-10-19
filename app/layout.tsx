import { Nunito } from "next/font/google";

import "./globals.css";

import ToastProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
// Components
import Navbar from "./components/navbar";
import ClientOnly from "./components/ClientOnly";
// Modals
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

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
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly currentUser={currentUser}>
          <StyledComponentsRegistry>
            <ToastProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal currentUser={currentUser} />
            <SearchModal />
            <Navbar currentUser={currentUser} />
            <div className="pb-20 pt-28">{children}</div>
          </StyledComponentsRegistry>
        </ClientOnly>
      </body>
    </html>
  );
}

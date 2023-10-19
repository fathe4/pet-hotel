"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CurrentUser, SafeUser } from "../types";

interface ClientOnlyProps {
  children: React.ReactNode;
  currentUser?: CurrentUser | null;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, currentUser }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  if (currentUser?.token) {
    localStorage.setItem("accessToken", currentUser?.token);
  }

  return (
    <div>
      {/* <SessionProvider session={session}> */}
      <Provider store={store}>{children}</Provider>
      {/* </SessionProvider> */}
    </div>
  );
};

export default ClientOnly;

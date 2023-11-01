"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface ClientOnlyProps {
  children: React.ReactNode;
  currentUser?: any;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, currentUser }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (currentUser) {
    localStorage.setItem("accessToken", currentUser);
  }

  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default ClientOnly;

"use client";
// React libraries
import React, { FC, useCallback, useState } from "react";
// Icons
import { AiOutlineMenu } from "react-icons/ai";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
// Modals
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const token = localStorage.getItem("accessToken");
  const onRent = useCallback(() => {
    if (!token) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [token, loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Add Your Hotel
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {!token ? (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => router.push("/dashboard")}
                  label="Dashboard"
                />
                {/* <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                /> */}
                {/* <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                /> */}
                <MenuItem onClick={() => onRent()} label="Add Your Hotel" />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                    localStorage.removeItem("accessToken");
                  }}
                  label="Logout"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

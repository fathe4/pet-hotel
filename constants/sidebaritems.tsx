import type { MenuProps } from "antd";
import { FaUsers } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { MdPets } from "react-icons/md";

import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const userDashboard: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard/my-hostels`}>My Hostels</Link>,
      key: "my-hostels",
      icon: <RiHotelLine />,
    },
    {
      label: <Link href={`/dashboard/manage-bookings`}>Manage Bookings</Link>,
      key: "manage-booking",
      icon: <FaUsers />,
    },
  ];

  const adminDashboard: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard/manage-hostels`}>All Hostels</Link>,
      key: "manage-hostels",
      icon: <RiHotelLine />,
    },
    {
      label: <Link href={`/dashboard/pet-types`}>Pet types</Link>,
      key: "add_pet_type",
      icon: <MdPets />,
    },
    {
      label: <Link href={`/dashboard/manage-bookings`}>Manage Bookings</Link>,
      key: "manage-booking",
      icon: <FaUsers />,
    },
  ];
  const superAdminDashboard: MenuProps["items"] = [
    ...adminDashboard,
    {
      label: <Link href={`/dashboard/users`}>All Users</Link>,
      key: "all_users",
      icon: <FaUsers />,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminDashboard;
  else if (role === USER_ROLE.ADMIN) return adminDashboard;
  else if (role === USER_ROLE.CUSTOMER) return userDashboard;
};

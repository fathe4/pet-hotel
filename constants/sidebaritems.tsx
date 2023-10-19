import type { MenuProps } from "antd";
import { FaUsers } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { MdPets } from "react-icons/md";

import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const userDashboard: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard/manage-hostels`}>All Hostels</Link>,
      key: "manage-hostels",
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

  //   const commonAdminSidebarItems: MenuProps["items"] = [
  //     {
  //       label: <Link href={`/${role}/manage-student`}>Manage Students</Link>,
  //       icon: <TableOutlined />,
  //       key: `/${role}/manage-student`,
  //     },
  //     {
  //       label: <Link href={`/${role}/manage-faculty`}>Manage Faculty</Link>,
  //       icon: <TableOutlined />,
  //       key: `/${role}/manage-faculty`,
  //     },
  //   ];

  //   const adminSidebarItems: MenuProps["items"] = [
  //     ...defaultSidebarItems,
  //     ...commonAdminSidebarItems,
  //     {
  //       label: "Manage academic",
  //       key: "manage-academic",
  //       icon: <TableOutlined />,
  //       children: [
  //         {
  //           label: <Link href={`/${role}/academic/faculty`}>Faculties</Link>,
  //           key: `/${role}/academic/faculty`,
  //         },
  //         {
  //           label: <Link href={`/${role}/academic/department`}>Departments</Link>,
  //           key: `/${role}/academic/department`,
  //         },
  //         {
  //           label: <Link href={`/${role}/academic/semester`}>Semesters</Link>,
  //           key: `/${role}/academic/semester`,
  //         },
  //       ],
  //     },
  //     {
  //       label: "Management",
  //       key: "management",
  //       icon: <AppstoreOutlined />,
  //       children: [
  //         {
  //           label: <Link href={`/${role}/department`}>Department</Link>,
  //           key: `/${role}/department`,
  //         },
  //         {
  //           label: <Link href={`/${role}/building`}>Building</Link>,
  //           key: `/${role}/building`,
  //         },
  //         {
  //           label: <Link href={`/${role}/room`}>Rooms</Link>,
  //           key: `/${role}/room`,
  //         },
  //         {
  //           label: <Link href={`/${role}/course`}>Course</Link>,
  //           key: `/${role}/course`,
  //         },
  //         {
  //           label: (
  //             <Link href={`/${role}/semester-registration`}>
  //               Semester registration
  //             </Link>
  //           ),
  //           key: `/${role}/semester-registration`,
  //         },
  //         {
  //           label: <Link href={`/${role}/offered-course`}>Offered courses</Link>,
  //           key: `/${role}/offered-course`,
  //         },
  //         {
  //           label: (
  //             <Link href={`/${role}/offered-course-section`}>
  //               Course sections
  //             </Link>
  //           ),
  //           key: `/${role}/offered-course-section`,
  //         },
  //       ],
  //     },
  //   ];

  //   const superAdminSidebarItems: MenuProps["items"] = [
  //     ...defaultSidebarItems,
  //     ...commonAdminSidebarItems,
  //     {
  //       label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
  //       icon: <TableOutlined />,
  //       key: `/${role}/admin`,
  //     },
  //     {
  //       label: <Link href={`/${role}/user`}>Manage User</Link>,
  //       icon: <TableOutlined />,
  //       key: `/${role}/user`,
  //     },
  //     {
  //       label: "Management",
  //       key: "management",
  //       icon: <AppstoreOutlined />,
  //       children: [
  //         {
  //           label: <Link href={`/${role}/department`}>Department</Link>,
  //           key: `/${role}/department`,
  //         },
  //       ],
  //     },
  //   ];

  //   const facultySidebarItems: MenuProps["items"] = [
  //     ...defaultSidebarItems,
  //     {
  //       label: <Link href={`/${role}/courses`}>Courses</Link>,
  //       icon: <TableOutlined />,
  //       key: `/${role}/courses`,
  //     },
  //   ];

  //   const studentSidebarItems: MenuProps["items"] = [
  //     ...defaultSidebarItems,
  //     {
  //       label: <Link href={`/${role}/courses`}>Courses</Link>,
  //       icon: <TableOutlined />,
  //       key: `/${role}/courses`,
  //     },
  //     {
  //       label: <Link href={`/${role}/courses/schedule`}>Course schedules</Link>,
  //       icon: <ScheduleOutlined />,
  //       key: `/${role}/courses/schedule`,
  //     },
  //     {
  //       label: <Link href={`/${role}/registration`}>Registration</Link>,
  //       icon: <ThunderboltOutlined />,
  //       key: `/${role}/registration`,
  //     },
  //     {
  //       label: <Link href={`/${role}/payment`}>Payment</Link>,
  //       icon: <CreditCardOutlined />,
  //       key: `/${role}/payment`,
  //     },
  //     {
  //       label: <Link href={`/${role}/academic-report`}>Academic report</Link>,
  //       icon: <FileTextOutlined />,
  //       key: `/${role}/academic-report`,
  //     },
  //   ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminDashboard;
  else if (role === USER_ROLE.ADMIN) return adminDashboard;
  else if (role === USER_ROLE.CUSTOMER) return userDashboard;
  //   else if (role === USER_ROLE.STUDENT) return studentSidebarItems;
};

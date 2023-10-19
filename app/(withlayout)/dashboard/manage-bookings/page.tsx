"use client";

import Button from "@/app/components/Button";
import DataTable from "@/app/components/DataTable";
import EditBookingModal from "@/app/components/modals/EditManageBooking";
import useEditBookingModal from "@/app/hooks/UseEditBookingModal";
import { SafeListing } from "@/app/types";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";
import { useDeleteListingMutation } from "@/redux/api/listingApi";
import { Space } from "antd";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageBookings = () => {
  const [bookingId, setBookingId] = useState();
  const editBookingModal = useEditBookingModal();
  const { data: bookings, isLoading: IsListingLoading } = useGetBookingsQuery(
    {}
  );

  const [deleteListing] = useDeleteListingMutation();
  const [deleteBook] = useDeleteBookingMutation();

  const usersWithKeys = bookings?.map((user: SafeListing) => ({
    ...user,
    key: String(user.id),
  }));
  const columns = [
    {
      title: "Check-In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (text, record) => {
        const formattedDate = format(
          new Date(record.checkIn),
          "MMMM dd, yyyy HH:mm:ss"
        );
        return formattedDate;
      },
    },
    {
      title: "Check-Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (text, record) => {
        const formattedDate = format(
          new Date(record.checkOut),
          "MMMM dd, yyyy HH:mm:ss"
        );
        return formattedDate;
      },
    },
    {
      title: "Hotel Name",
      dataIndex: ["hostel", "title"],
      key: "hostelId",
    },
    {
      title: "Pet Count",
      dataIndex: "petCount",
      key: "petCount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userId",
    },
    {
      title: "Action",
      key: "action",
      render: function (_, record: any) {
        return (
          <Space size="middle">
            <Button
              small={true}
              outline={true}
              label="Edit"
              onClick={() => {
                setBookingId(record.id);
                editBookingModal.onOpen();
              }}
            />
            <Button
              small={true}
              label="Delete"
              onClick={() => handleDelete(record.id)}
            />
          </Space>
        );
      },
    },
  ];

  const handleDelete = async (id: string) => {
    console.log(id, "id");

    const result = await deleteBook(id);
    if (result?.data) {
      toast.success("booking deleted");
    }
  };

  return (
    <>
      <EditBookingModal bookingId={bookingId} />
      <DataTable
        loading={IsListingLoading}
        columns={columns}
        dataSource={usersWithKeys}
      />
    </>
  );
};

export default ManageBookings;

"use client";

import Button from "@/app/components/Button";
import DataTable from "@/app/components/DataTable";
import { SafeListing } from "@/app/types";
import {
  useDeleteListingMutation,
  useGetListingsQuery,
} from "@/redux/api/listingApi";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageHostels = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  query["size"] = size;
  query["page"] = page;

  const { data: hostels, isLoading: IsListingLoading } = useGetListingsQuery({
    ...query,
  });

  const [deleteListing] = useDeleteListingMutation();
  const usersWithKeys = hostels?.hostels?.map((user: SafeListing) => ({
    ...user,
    key: String(user.id),
  }));
  const columns: ColumnsType = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Owner Name",
      dataIndex: ["owner", "name"],
      key: "ownerName",
    },
    {
      title: "Pet Type",
      dataIndex: ["petType", "typeName"],
      key: "petType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Total Booked",
      dataIndex: "totalBooked",
      key: "totalBooked",
    },
    {
      title: "Action",
      key: "action",
      render: function (_, record: any) {
        return (
          <Space size="middle">
            <Link href={`/SUPER_ADMIN/hostels/edit/${record.id}`}>Edit</Link>
            <Button label="Delete" onClick={() => handleDelete(record.id)} />
          </Space>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteListing(id);
    if (result?.data) {
      toast.success("hotel deleted");
    }
  };

  return (
    <DataTable
      loading={IsListingLoading}
      columns={columns}
      dataSource={usersWithKeys}
      onPaginationChange={onPaginationChange}
      totalPages={hostels?.meta?.total}
      pageSize={size}
    />
  );
};

export default ManageHostels;

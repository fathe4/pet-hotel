"use client";

import Button from "@/app/components/Button";
import DataTable from "@/app/components/DataTable";
import Modal from "@/app/components/modals";
import CreatePetModal from "@/app/components/modals/CreatePetModal";
import useCreatePetModal from "@/app/hooks/UseCreatePetModal";
import { SafeListing } from "@/app/types";
import {
  useDeleteListingMutation,
  useGetListingsQuery,
} from "@/redux/api/listingApi";
import {
  useDeletePetTypeMutation,
  useGetPetTypesQuery,
} from "@/redux/api/petTypeApi";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const PetTypes = () => {
  const petModal = useCreatePetModal();

  const { data: petTypes, isLoading: isPetTypeLoading } = useGetPetTypesQuery(
    {}
  );

  const [deletePetType] = useDeletePetTypeMutation();
  const petsWithKeys = petTypes?.map((user: SafeListing) => ({
    ...user,
    key: String(user.id),
  }));
  console.log(petsWithKeys);

  const columns: ColumnsType = [
    {
      title: "Pet Icon",
      dataIndex: "imgSrc",
      key: "imgSrc",
      render: (text, record: any) => (
        <Image
          src={record.imgSrc}
          alt={record.typeName}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Pet Type name",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Action",
      key: "action",
      render: function (_, record: any) {
        return (
          <Space size="middle">
            {/* <Link href={`/SUPER_ADMIN/hostels/edit/${record.id}`}>Edit</Link> */}
            <Button label="Delete" onClick={() => handleDelete(record.id)} />
          </Space>
        );
      },
    },
  ];
  if (petModal.isOpen) {
    return <CreatePetModal />;
  }

  const handleDelete = async (id: string) => {
    const result = await deletePetType(id);
    if (result?.data) {
      return toast.success("Deleted Pet type");
    }
    toast.error(result?.error);
  };

  return (
    <>
      <div className="flex justify-between ">
        <div></div>
        <div className="w-52 mb-4">
          <Button
            outline
            label="Create Pet type"
            onClick={() => petModal.onOpen()}
          />
        </div>
      </div>
      <DataTable
        loading={isPetTypeLoading}
        columns={columns}
        dataSource={petsWithKeys}
      />
    </>
  );
};

export default PetTypes;

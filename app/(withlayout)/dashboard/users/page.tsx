"use client";

import Button from "@/app/components/Button";
import DataTable from "@/app/components/DataTable";
import { SafeUser } from "@/app/types";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Users: React.FC = () => {
  const { data: users } = useGetUsersQuery({});
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const usersWithKeys = users?.map((user: SafeUser) => ({
    ...user,
    key: String(user.id),
  }));
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "action",
      render: function (_, record: any) {
        return (
          <Space size="middle">
            <Button
              label="Make Admin"
              onClick={(data) => handleMakeAdmin(record)}
            />
            <Button label="Delete" onClick={(data) => handleDelete(record)} />
          </Space>
        );
      },
    },
  ];

  const handleMakeAdmin = async (user: SafeUser) => {
    const data = { role: "ADMIN" };
    const result = await updateUser({
      data,
      userId: user.id,
    });
    if (result?.data) {
      toast.success("User role updated to admin");
    }
  };

  const handleDelete = async (user: SafeUser) => {
    const result = await deleteUser(user.id);
    if (result?.data) {
      toast.success("User deleted");
    }
  };

  return <DataTable columns={columns} dataSource={usersWithKeys} />;
};

export default Users;

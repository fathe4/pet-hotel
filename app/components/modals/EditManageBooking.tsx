"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from ".";
import Heading from "../Heading";

import Input from "../inputs";

import { useAddPetTypeMutation } from "@/redux/api/petTypeApi";
import { toast } from "react-hot-toast";
import {
  useDeleteBookingMutation,
  useGetBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import useEditBookingModal from "@/app/hooks/UseEditBookingModal";
import Loader from "../Loader";
import { Select } from "antd";

const EditBookingModal = ({ bookingId }: { bookingId: string }) => {
  const router = useRouter();
  const editBookingModal = useEditBookingModal();
  const [updateBook] = useUpdateBookingMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: booking, isLoading: isBookingLoading } =
    useGetBookingQuery(bookingId);
  const [data, setData] = useState(booking);
  const [status, setStatus] = useState(booking);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      petCount: data?.petCount,
      status: data?.status,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedData = {
      ...data,
      status,
    };
    setIsLoading(true);
    const result = await updateBook({ data: updatedData, id: bookingId });
    console.log(result, "result");

    if (result?.error) {
      console.error(result?.error?.data);
      toast.error(result?.error?.data);
      setIsLoading(false);
      return;
    }
    reset();
    editBookingModal.onClose();
    toast.success("Booking updated!");
    setIsLoading(false);
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Input
        id="petCount"
        label="Pet Count"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        defaultValue={data?.petCount}
        required
      />
      <Select
        showSearch
        placeholder="Select Status"
        onChange={(value) => setStatus(value)}
        defaultValue={data?.status}
        size="large"
        options={[
          {
            value: "pending",
            label: "Pending",
          },
          {
            value: "confirmed",
            label: "confirmed",
          },
          {
            value: "cancelled",
            label: "cancelled",
          },
          {
            value: "completed",
            label: "completed",
          },
        ]}
      />
    </div>
  );

  return (
    <Modal
      isOpen={editBookingModal.isOpen}
      onClose={editBookingModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={"Update"}
      title="Update Booking Information"
      body={bodyContent}
    />
  );
};

export default EditBookingModal;

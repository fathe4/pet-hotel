"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from ".";
import Heading from "../Heading";

import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs";

import { useAddListingMutation } from "@/redux/api/listingApi";
import useCreatePetModal from "@/app/hooks/UseCreatePetModal";
import { useAddPetTypeMutation } from "@/redux/api/petTypeApi";
import { toast } from "react-hot-toast";

const CreatePetModal = () => {
  const router = useRouter();
  const petModal = useCreatePetModal();
  const [addPetType] = useAddPetTypeMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      typeName: "",

      imgSrc: "",
    },
  });

  const imageSrc = watch("imgSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data");
    setIsLoading(true);
    const result = await addPetType(data);
    console.log(result, "result");

    if (result?.error) {
      console.error(result?.error?.data);
      toast.error(result?.error?.data);
      setIsLoading(false);
      return;
    }
    reset();
    petModal.onClose();
    toast.success("pet type Created!");
    setIsLoading(false);
  };

  // Step 1
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help pet owner to find you!"
      />
      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue("imgSrc", value)}
      />
      <Input
        id="typeName"
        label="Type Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={petModal.isOpen}
      onClose={petModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={"Create pet"}
      title="Add Pet Type"
      body={bodyContent}
    />
  );
};

export default CreatePetModal;

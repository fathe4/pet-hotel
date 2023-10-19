"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from ".";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getBaseUrl } from "@/app/helpers/config/envConfig";
import { CurrentUser, petType } from "@/app/types";
import { useAddListingMutation } from "@/redux/api/listingApi";
import { useGetPetTypesQuery } from "@/redux/api/petTypeApi";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = ({ currentUser }: { currentUser: CurrentUser | null }) => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [addListing] = useAddListingMutation();
  const { data: petTypes } = useGetPetTypesQuery({});

  const [step, setStep] = useState(STEPS.CATEGORY);
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
      petTypeId: "",
      locationValue: null,
      capacity: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("petTypeId");
  const location = watch("locationValue");
  const capacity = watch("capacity");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { locationValue, price, ...rest } = data;

    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    const result = await addListing({
      ...rest,
      locationValue: locationValue?.value,
      price: parseInt(price),
    });
    if (result?.error) {
      console.error(result?.error?.data);
      toast.error(result?.error?.data);
      setIsLoading(false);
      return;
    }
    reset();
    setStep(STEPS.CATEGORY);
    rentModal.onClose();
    toast.success("Hotel Created!");
    setIsLoading(false);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  // Step 1
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {petTypes?.map((item: petType) => (
          <div key={item.id} className="col-span-1">
            <CategoryInput
              onClick={(petType) => setCustomValue("petTypeId", item.id)}
              selected={category === item.id}
              label={item.typeName}
              imgSrc={item.imgSrc}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help pet owner to find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("locationValue", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  // Step 3
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Pet Capacity"
          subtitle="How many pets do you allow?"
          value={capacity}
          onChange={(value) => setCustomValue("capacity", value)}
        />
      </div>
    );
  }

  // Step 4
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show pet owners what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  // Step 5
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  // Step 6
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Add Your Pet hotel!"
      body={bodyContent}
    />
  );
};

export default RentModal;

"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { useAddBookingMutation } from "@/redux/api/bookingApi";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [reserve] = useAddBookingMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPet, setTotalPet] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const token = localStorage.getItem("accessToken");

  const onCreateReservation = useCallback(async () => {
    if (!token) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    const result: any = await reserve({
      petCount: totalPet,
      totalPrice,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      hostelId: listing?.id,
    });
    if (result?.error) {
      console.error(result?.error?.data);
      toast.error(result?.error?.data);
      setIsLoading(false);
      return;
    }

    toast.success("Booked");
    setDateRange(initialDateRange);
    setIsLoading(false);
    router.push("/dashboard/manage-bookings");
  }, [totalPrice, totalPet, dateRange, listing?.id, router, token, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(totalPet * dayCount * listing.price);
      } else {
        setTotalPrice(totalPet * listing.price);
      }
    }
  }, [dateRange, listing.price, totalPet]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          mt-8
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo {...listing} />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                totalPet={totalPet}
                onChangeDate={(value) => setDateRange(value)}
                onChangeTotalPet={(value: number) => setTotalPet(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;

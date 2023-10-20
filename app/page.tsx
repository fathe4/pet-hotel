"use client";
import React from "react";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { useGetListingsQuery } from "@/redux/api/listingApi";
import { SafeListing } from "./types";
import Loader from "./components/Loader";

interface PageProps {
  searchParams: IListingsParams;
}

const Page = async ({ searchParams }: PageProps) => {
  const { data: listings }: any = useGetListingsQuery({
    ...searchParams,
    size: process.env.NEXT_PUBLIC_PAGE_SIZE,
  });

  const currentUser = await getCurrentUser();

  if (listings?.hostels?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.hostels?.map((listing: SafeListing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Page;

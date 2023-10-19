"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { FC } from "react";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

const ListingInfo: FC<SafeListing> = ({
  owner,
  description,
  capacity,
  petType,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinate = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {owner?.name}</div>
          <Avatar />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>Capacity {capacity} Pets</div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">
          Allowed Pet: {petType.typeName}
        </div>
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinate} />
    </div>
  );
};

export default ListingInfo;

import { useGetListingsQuery } from "@/redux/api/listingApi";
import axios from "axios";
import { getBaseUrl } from "../helpers/config/envConfig";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await axios.get(getBaseUrl() + "/hostels/" + listingId, {});

    if (!listing.data.data) {
      return null;
    }

    return {
      ...listing.data.data,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/app/types";

const LISTING_URL = "/hostels";

export const ListingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getListings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: LISTING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta: IMeta) => {
        return {
          hostels: response,
          meta,
        };
      },
      providesTags: [tagTypes.listing],
    }),
    addListing: build.mutation({
      query: (data) => ({
        url: LISTING_URL + "/create-hostel",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.listing],
    }),
    deleteListing: build.mutation({
      query: (id) => ({
        url: LISTING_URL + "/" + id,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.listing],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useAddListingMutation,
  useDeleteListingMutation,
} = ListingApi;

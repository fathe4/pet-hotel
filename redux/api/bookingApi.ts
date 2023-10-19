import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/app/types";

const BOOKING_URL = "/bookings";

export const ListingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateBooking: build.mutation({
      query: ({ data, id }) => ({
        url: BOOKING_URL + "/" + id,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: BOOKING_URL + "/" + id,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    addBooking: build.mutation({
      query: (data) => ({
        url: BOOKING_URL + "/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    getBookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BOOKING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta: IMeta) => {
        return response;
      },
      providesTags: [tagTypes.booking],
    }),
    getBooking: build.query({
      query: (id: string) => {
        return {
          url: BOOKING_URL + "/" + id,
          method: "GET",
        };
      },
      transformResponse: (response, meta: IMeta) => {
        return response;
      },
      providesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useGetBookingsQuery,
  useGetBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = ListingApi;

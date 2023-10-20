import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userRegister: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getUserDetails: build.query({
      query: () => {
        return {
          url: "/users/profile",
          method: "GET",
        };
      },

      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useGetUserDetailsQuery,
  useUserRegisterMutation,
} = authApi;

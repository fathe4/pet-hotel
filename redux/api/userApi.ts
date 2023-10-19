import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const USERS_URL = "/users";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: USERS_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.users],
    }),
    updateUser: build.mutation({
      query: ({ data, userId }) => ({
        url: USERS_URL + "/" + userId,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    deleteUser: build.mutation({
      query: (userId) => ({
        url: USERS_URL + "/" + userId,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;

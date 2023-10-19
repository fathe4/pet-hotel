import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PET_TYPE_URL = "/pet-types";

export const PetTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPetTypes: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: PET_TYPE_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.petType],
    }),
    addPetType: build.mutation({
      query: (data) => ({
        url: PET_TYPE_URL + "/create-pet-type",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.petType],
    }),
    deletePetType: build.mutation({
      query: (id) => ({
        url: PET_TYPE_URL + "/" + id,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.petType],
    }),
  }),
});

export const {
  useGetPetTypesQuery,
  useAddPetTypeMutation,
  useDeletePetTypeMutation,
} = PetTypeApi;

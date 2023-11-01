export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/",
    // "/dashboard/manage-hostels",
    // "/dashboard/pet-types",
    // "/dashboard/manage-bookings",
    // "/dashboard/users",
  ],
};

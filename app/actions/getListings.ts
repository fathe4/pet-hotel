import prisma from "@/app/libs/prismadb";
import axios from "axios";
import { getBaseUrl } from "../helpers/config/envConfig";

export interface IListingsParams {
  userId?: string;
  petType?: string;
  capacity?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  size?: number;
  page?: number;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      capacity,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (capacity) {
      query.capacity = {
        gte: +capacity,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await axios.get(getBaseUrl() + "/hostels", {
      params: query,
    });

    // const listings = await prisma.listing.findMany({
    //     where: query,
    //     orderBy: {
    //         createdAt: 'desc'
    //     }
    // });

    // const safeListings = listings.map((listing) => ({
    //     ...listing,
    //     createdAt: listing.createdAt.toISOString(),
    // }));

    return listings?.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

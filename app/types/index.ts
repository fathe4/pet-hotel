export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "SUPER_ADMIN";
  contactNo: string;
  address: string;
  profileImg: string;
  createdAt: string;
  token: string;
}

export type Session = User & {
  token: string;
};

export type petType = {
  id: string;
  imgSrc: string;
  typeName: string;
};

export type SafeListing = {
  capacity: number;
  createdAt: string;
  description: string;
  id: string;
  imageSrc: string;
  locationValue: string;
  owner: User;
  ownerId: string;
  petType: petType;
  petTypeId: string;
  price: number;
  reviews: any[];
  title: string;
  totalBooked: number;
};

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type CurrentUser = SafeUser & {
  token: string;
};

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

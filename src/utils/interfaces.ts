import { Types } from "mongoose";
import { Roles } from "./enums";

export interface IPayloadJWT {
  sub: string;
  name: string;
  role: Roles;
  iat: number;
}

export interface IUser {
  id?: Types.ObjectId;
  email: string;
  password: string;
  role: string;
  detail?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

export interface IBrand {
  id?: Types.ObjectId;
  name: string;
}

export interface ICategory {
  id?: Types.ObjectId;
  name: string;
}

export interface ICloudinaryImage {
  publicId: string;
  secureUrl: string;
}

export interface IProduct {
  id?: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ICloudinaryImage[];
  brand: Types.ObjectId;
  category: Types.ObjectId;
}

export interface IOrderItems {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id?: Types.ObjectId;
  customer: Types.ObjectId;
  total: number;
  isCancel: Boolean;
  items: IOrderItems[];
}

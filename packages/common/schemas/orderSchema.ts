import { productType } from "../schemas/productSchema";
import { addressType } from "./addressSchema";

export type orderType = {
  status: string;
  orderedBy: {
    name: String;
    mobile: String;
  };
  product: {
    title: string;
    image: string;
    quantity: Number;
    price: Number;
    _id: string;
  };

  deliveryAddress: addressType;
  priceDetails: {
    deliveryCharge: Number;
    discount: Number;
    totalAmount: Number;
  };
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  _id: any;
};

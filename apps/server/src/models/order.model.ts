import mongoose from "mongoose";
import { AddressSchema } from "./user.model";

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Order Confirmed", "Shipped", "Out For Delivery", "Delivered"],
      default: "Order Confirmed",
    },
    orderedBy: {
      name: String,
      mobile: String,
    },
    product: {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        require: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },

    deliveryAddress: {
      type: AddressSchema,
      required: true,
    },
    priceDetails: {
      deliveryCharge: {
        type: Number,
        default: 45,
      },
      discount: {
        type: Number,
        default: 0,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Orders", OrderSchema);

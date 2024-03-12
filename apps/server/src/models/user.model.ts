import { productType } from "common";
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

export const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Cannot be Empty"],
  },
  mobile: {
    type: String,
    required: [true, "Mobile Number Cannot be Empty"],
  },
  street: {
    type: String,
    required: [true, "Street Name Cannot be Empty"],
  },
  city: {
    type: String,
    required: [true, "City Cannot be Empty"],
  },
  state: {
    type: String,
    required: [true, "State Cannot be Empty"],
  },
  country: {
    type: String,
    required: [true, "Country Cannot be Empty"],
  },
  pincode: {
    type: String,
    required: [true, "Pincode Cannot be Empty"],
  },
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: [AddressSchema],

  cart: [cartItemSchema],

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],

  lockedOrders: [cartItemSchema],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
});

export const Users = mongoose.model("Users", UserSchema);

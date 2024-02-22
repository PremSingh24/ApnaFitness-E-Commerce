import { z } from "zod";

export const addressValidation = z.object({
  _id: z.any(),
  name: z.string().min(3, "Name cannot be Empty").max(30, "Name is too Long"),
  mobile: z
    .string()
    .min(10, "Mobile Number Should be 10 digits")
    .max(10, "Mobile Number Should be 10 digits"),
  street: z
    .string()
    .min(5, "Street name cannot be Empty")
    .max(25, "Street name is too Long"),
  city: z
    .string()
    .min(2, "City cannot be Empty")
    .max(25, "City name is too Long"),
  state: z
    .string()
    .min(3, "State cannot be Empty")
    .max(15, "State name is too Long"),
  country: z.string().refine((val) => val === "India", {
    message: "Country must be India",
  }),
  pincode: z
    .string()
    .min(6, "PinCode Should be of 6 Digits")
    .max(6, "PinCode Should be of 6 Digits"),
});

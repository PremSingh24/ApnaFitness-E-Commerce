import {z} from "zod";


export const addressValidation = z.object({
    _id:z.any(),
    name:z.string().min(3,"Name cannot be Empty").max(30,"Name is too Long"),
    mobile:z.string().min(10,"Mobile Number Should be 10 digits").max(10,"Mobile Number Should be 10 digits"),
    street:z.string().min(1,"Street name cannot be Empty").max(25,"Street name is too Long"),
    city:z.string().min(1,"City cannot be Empty").max(25,"City name is too Long"),
    state:z.string().min(1,"State cannot be Empty").max(25,"State name is too Long"),
    country:z.string().min(1,"Country cannot be Empty").max(25,"first name is too Long"),
    pincode:z.string()

})
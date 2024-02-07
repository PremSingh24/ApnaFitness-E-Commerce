import {z} from "zod";

export const registerUserValidation = z.object({
    firstName:z.string().min(2,"First Name Needs minimum 2 Characters").max(25,"First Name can be Max 20 Characters"),
    lastName:z.string().min(2,"Last Name Needs minimum 2 Characters").max(25,"Last Name can be Max 20 Characters"),
    mobile:z.string().min(10,"Mobile Should be 10 digits").max(10,"Mobile Should be 10 digits"),
    email:z.string().email().optional(), 
    password:z.string().min(8,"Password should be minimum 8 characters").max(20,"Password Can be Max 20 Characters")

}).passthrough()



export const loginUserValidation = z.object({
    email:z.string(),
    password:z.string()

})


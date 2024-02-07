import {z} from "zod";
import { registerUserValidation,loginUserValidation } from "../validators/userValidator";



export type registerUserType = z.infer<typeof registerUserValidation>

export type loginUserType = z.infer<typeof loginUserValidation>
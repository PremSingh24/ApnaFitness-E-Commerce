import {z} from "zod";
import { addressValidation } from "../validators/addressValidator";


export type addressType = z.infer<typeof addressValidation>
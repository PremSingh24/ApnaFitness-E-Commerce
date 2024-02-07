import {z} from "zod";
import { productValidation } from "../validators/productValidator";

export type productType = z.infer<typeof productValidation>
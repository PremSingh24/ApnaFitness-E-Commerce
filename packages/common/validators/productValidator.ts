import {z} from "zod";


export const productValidation = z.object({
    title:z.string().min(5,"title is too short").max(30,"title is too Long"),
    description:z.string().min(1,"description is too short").max(30,"description is too Long"),
    category:z.string(),
    rating:z.number().min(1).max(5),
    initialPrice:z.number(),
    currentPrice:z.number(),
    image:z.string(),
    inStock:z.boolean(),
    isDeliveredFast:z.boolean(),
    isTrending:z.boolean(),
    deliveryCharge:z.number(),
    _id:z.any(),

}).passthrough()
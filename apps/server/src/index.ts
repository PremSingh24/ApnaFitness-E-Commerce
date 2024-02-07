import express from "express";
import cors from "cors";
import { connectDB } from "./dataBase";
import dotenv from "dotenv";
import {Request,Response} from "express";

dotenv.config({path:"./.env"})

const app = express();

app.use(express.json());

app.use(cors({
    origin:process.env.CORS_ORIGIN   // Allowing Requests from Specific Hosts
}));


connectDB()
.then(()=>{
    app.listen(process.env.PORT||3000, ()  => { console.log(`Server is listening on port ${process.env.PORT}`) })
})
.catch((err)=>{
    console.log("Database Connection Error!!",err)  //// remove this at the time of hosting
})




///Routes Import

import addressRouter from "./routes/address.routes"
import orderRouter from "./routes/order.routes"
import userRouter from "./routes/auth.routes"
import cartRouter from "./routes/cart.routes"
import categoryRouter from "./routes/category.routes"
import productRouter from "./routes/product.routes"
import wishlistRouter from "./routes/wishlist.routes"



app.use("/api/v1/order",orderRouter)
app.use("/api/v1/address",addressRouter)
app.use("/api/v1/auth",userRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/wishlist",wishlistRouter)

app.use("/*", (req:Request,res:Response)=>{ res.status(404).json({message:"Invalid Route"})})


///Don't foget to remove all the error from catch response **********************************



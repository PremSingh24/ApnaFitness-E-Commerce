import mongoose from "mongoose";



const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    initialPrice:{
        type:Number,
        required:true

    },
    currentPrice:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    inStock:{
        type:Boolean,
        default:true
    },
    isDeliveredFast: {
        type:Boolean,
        default:true
    },
    isTrending: {
        type:Boolean,
        default:false
    },
    deliveryCharge:{
        type:Number,
        default:45
    }
})
  
  
export const Products = mongoose.model("Products",ProductSchema);
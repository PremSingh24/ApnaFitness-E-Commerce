import mongoose from "mongoose";



export const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log("Database Connected")  /// Remove at hosting

    }catch(error){
        console.log(`My Database Error ${error}`)  /// Remove at hosting

    }
}

  
import { Users } from '../models/user.model';
import { Products } from '../models/product.model'; 
import {Request,Response} from "express"

/*
  * All the routes related to Wishlist are present here.
  * These are private routes.
  * Client needs to add "authorization" header with JWT token in it to access it.
*/


/*
    * This handler handles getting items to user's wishlist.
    * send GET Request at /api/v1/user/wishlist/all
*/

export const getWishlistItemsHandler = async(req:Request, res:Response) =>{
  
  try{
    const user = await Users.findById(req.headers["user"]).populate("wishlist");

    if(user){
      res.status(200).json({products:user.wishlist || []});

    }else{
      res.status(401).json({message:"Invalid User, Try to Login Again"});
    }

  }catch(error){
    res.status(406).json({ message:"Something Went Wrong",error });
  }

}



/*
    * This handler handles adding items to user's wishlist.
    * send POST Request at /api/v1/user/wishlist
    * URL contains {ProductId}
*/

export const addItemsToWishlistHandler = async(req:Request, res:Response) =>{

  try{

    const Product = await Products.findById(req.params.ProductId);

    if(Product){
      const user = await Users.findById(req.headers["user"]);

      if(user){
        await user.updateOne({$addToSet:{wishlist:Product}}); //using $addToSet to store only unique values
        
        res.status(201).json({ message: "Product Added to Wishlist" });

      }else{
        res.status(401).json({message:"Invalid User, Ty to Login Again"});

      }
      
    }else{
      res.status(401).json({message:"Invalid Product"});
    }

  }catch(error){
    res.status(406).json({message:"Something Went Wrong",error});
  }

}


/*
  * This handler handles removing items to user's wishlist.
  * send DELETE Request at /api/v1/user/wishlist
  * URL contains {ProductId}
*/

export const removeItemsFromWishlistHandler = async(req:Request, res:Response) =>{
  try{
    const Product = await Products.findById(req.params.ProductId);
    
    if(Product){
      var user = await Users.findById(req.headers["user"]);

      if(user){
        await user.updateOne({$pull:{wishlist:req.params.ProductId}});

        res.status(201).json({ message: "Product Removed from Wishlist" });
    
      }else{
        res.status(401).json({ message:"Invalid User, Try to Login Again" });
      }

    }else{
      res.status(401).json({message:"Invalid Product"});
    }

  }catch(error){
    res.status(401).json({ message:"Something Went Wrong",error });
  }

}
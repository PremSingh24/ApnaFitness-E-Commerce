import { Users } from '../models/user.model';
import { Orders } from '../models/order.model';
import {Request,Response} from "express"


/*
  * All the routes related to Wishlist are present here.
  * These are private routes.
  * Client needs to add "authorization" header with JWT token in it to access it.
*/


/*
    * This handler handles getting items from user's orders.
    * send GET Request at /api/v1/order/myorder 
*/


export const getOrderItemsHandler = async(req:Request, res:Response) =>{

  try{

    const user = await Users.findById(req.headers["user"]).populate("orders")

    if(user){

      res.json({products:user.orders || []});
    }else{

      res.status(401).json({message:"User Not Found, Try to Login Again"})
    }

  }catch(error){
    res.status(406).json({message:"Something Went Wrong"})
  }

}


/*
    * This handler handles adding items in user's orders.
    * send POST Request at /api/v1/order/placeOrder 
*/

// Will Make This Later ( NO Worries :)
export const placeOrderHandler = async(req:Request, res:Response) =>{

  try{

    const order = new Orders(req.body)

    await order.save();

    if(order){

      res.json({products:order || []});
    }else{

      res.status(401).json({message:"User Not Found, Try to Login Again"})
    }

  }catch(error){
    res.status(406).json({message:"Something Went Wrong"})
  }

}
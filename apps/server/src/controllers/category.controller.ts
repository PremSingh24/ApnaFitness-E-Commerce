import { Products } from "../models/product.model";
import { Category } from "../models/category.model";
import { Request, Response } from "express";

/*
 * All the routes related to Category are present here.
 * These are Publicly accessible routes.
 */

/*
 * This handler handles gets all categories in the db.
 * send GET Request at /api/v1/category/all
 */

export const getCategoryHandler = async (req: Request, res: Response) => {
  try {
    const category = await Category.find({});

    res.status(200).json({ category });
  } catch (error) {
    res.status(406).json({ message: "Something Went Wrong" });
  }
};

/*
 * This handler handles gets all products of a Specific categories in the db.
 * send GET Request at /api/v1/category/:CategoryId
 */

export const getCategoryItemsHandler = async (req: Request, res: Response) => {
  const category = req.params.CategoryId;

  try {
    const products = await Products.find({ category });

    res.status(200).json({ products });
  } catch (error) {
    res.status(406).json({ message: "Something Went Wrong" });
  }
};

//Below route is for adding items in category db (DEV TIME)

/*export const addCategory = async(req:Request,res:Response) =>{

    const item = req.body

    if(item){
        try{
            const newItem =  new Category(item);
    
            await newItem.save();
            res.status(200).json({mssage:"category added"});
    
        }catch(error){
            res.status(400).json({mssage:"not added"});
        }

    }else{
        res.status(400).json({mssage:"already added"});
    }
}*/

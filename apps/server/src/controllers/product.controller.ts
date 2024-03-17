import { Products } from "../models/product.model";
import { Request, Response } from "express";

/*
 * All the routes related to Product are present here.
 * These are Publicly accessible routes.
 */

/*
 * This handler handles gets all products in the db.
 * send GET Request at /api/v1/products/all
 */

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await Products.find({});

    res.status(200).json({ products }).end();
  } catch (error) {
    res.status(406).json({ message: "Something Went Wrong" }).end();
  }
};

/*
 * This handler handles getting a Specific Product.
 * send GET Request at /api/v1/products/:ProductId
 */

export const getProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await Products.findById(req.params.ProductId);

    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(406).json({ message: "Something Went Wrong" });
  }
};

// For Adding Products to DB (Only Dev-time)

/*export const newProduct = async(req:Request,res:Response)=>{
  const product = req.body

  try{
    const NewProduct = new Products(product)
    await NewProduct.save();

    res.status(200).json({message:"Product Saved Successfully"})


  }catch(error){

      res.status(409).json({message:"Could not Save Product!",error})
  }
  
}*/

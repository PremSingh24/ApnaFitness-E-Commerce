import { Users } from "../models/user.model";
import { Products } from "../models/product.model";
import { Request, Response } from "express";

/*
 * All the routes related to Cart are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 */

/*
 * This handler handles getting items from user's cart.
 * send GET Request at /api/v1/cart/mycart
 */

export const getCartItemsHandler = async (req: Request, res: Response) => {
  try {
    var user = await Users.findById(req.headers["user"]).populate("cart.item");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found, Try to Login Again" });
    }
    res.json({ products: user.cart || [] }).end();
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

/*
 * This handler handles adding items to user's cart.
 * send POST Request at /api/v1/cart/:ProductId
 */

export const addItemToCartHandler = async (req: Request, res: Response) => {
  try {
    const Product = await Products.findById(req.params.ProductId);

    if (!Product) {
      return res.status(404).json({ message: "Invalid Product" });
    }
    const user = await Users.findById(req.headers["user"]);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found, Try to Login Again" });
    }
    const ItemPresent = user.cart.find((cartItem) =>
      cartItem.item.equals(Product._id)
    );

    if (ItemPresent) {
      return res.status(200).json({ message: "Item Already in Cart" });
    }
    user.cart.push({ item: Product, quantity: 1 });
    user.save();

    const cartId = user.cart[user.cart.length - 1]._id;

    res
      .status(201)
      .json({ message: "Product Added to Cart successfully", cartId });
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

/*
 * This handler handles removing items to user's cart.
 * send DELETE Request at /api/v1/cart/:CartId
 */

export const removeItemFromCartHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await Users.findById(req.headers["user"]);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found, Try to Login Again" });
    }
    const ItemPresent = user.cart.id(req.params.CartId);

    if (!ItemPresent) {
      return res.status(404).json({ message: "Invalid Product" });
    }
    await user.updateOne({ $pull: { cart: { _id: req.params.CartId } } }); /// Removing with the CartId, as Every Cart Item has a Unique Id

    res.status(200).json({ message: "Product Removed from Cart" });
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

/*
 * This handler handles updating item quantity to user's cart.
 * send PATCH Request at /api/v1/cart/:CartId
 * body contains {quantity} (whose 'type' can be increment or decrement)
 */
export const updateCartItemHandler = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.headers["user"]);

    if (!user) {
      return res
        .status(406)
        .json({ message: "User Not Found, Try to Login Again" });
    }
    const itemPresent = user.cart.id(req.params.CartId);

    if (!itemPresent) {
      return res.status(404).json({ message: "Invalid Product" });
    }
    await user.updateOne(
      { $set: { "cart.$[item].quantity": req.body.quantity } },
      { arrayFilters: [{ "item._id": req.params.CartId }] }
    );

    res.status(201).json({ message: "Product Quantity Updated" });
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

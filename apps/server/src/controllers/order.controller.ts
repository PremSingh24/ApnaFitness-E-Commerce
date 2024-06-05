import { Users } from "../models/user.model";
import { Orders } from "../models/order.model";
import { Request, Response } from "express";
import { addressValidation, cartType, productType } from "common";
import Razorpay from "razorpay";

import crypto from "crypto";

/*
 * All the routes related to Wishlist are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 */

/*
 * This handler handles getting items from user's orders.
 * send GET Request at /api/v1/order/myOrder
 */

export const getOrderItemsHandler = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.headers["user"]).populate("orders");

    if (user) {
      res.status(200).json({ orders: user.orders || [] });
    } else {
      res.status(404).json({ message: "User Not Found, Try to Login Again" });
    }
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

const instance = new Razorpay({
  key_id: process.env.RazorPay_Key_Id || "",
  key_secret: process.env.RazorPay_Key_Secret,
});

/*
 * This handler handles verifying user's order and address.
 * send POST Request at /api/v1/order/placeOrder
 */
export const verifyOrderHandler = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.headers["user"]).populate("cart.item"); // prettier-ignore

    if (!user) {
      res.status(400).json({ message: "User Not Found" }).end();
    } else {
      const validAddress = addressValidation.safeParse(
        req.body.deliveryAddress
      );

      if (validAddress.success) {
        const userCart: cartType[] = req.body.cart;
        let totalCartAmount = 0;
        for (const cartItem of user.cart) {
          const item: any = cartItem.item;
          //Checking if ALl the Cart item matches with frontend
          const foundCartItem = userCart.find(
            (cart) => cart.item._id === item._id.toString()
          );
          if (!foundCartItem || foundCartItem.quantity !== cartItem.quantity) {
            return res
              .status(400)
              .json({ message: "Cart verification failed" })
              .end();
          }

          //Calculating Total Amount

          totalCartAmount +=
            item.currentPrice * cartItem.quantity + item.deliveryCharge;
        }

        if (totalCartAmount === req.body.amount) {
          //Locking the User's Cart in user.lockedOrder for safety of order
          user.lockedOrders = user.cart;
          await user.save();
          const options = {
            amount: totalCartAmount * 100, // amount in the smallest currency unit
            currency: "INR",
          };
          const order = await instance.orders.create(options);
          if (order.status === "created") {
            const key = process.env.RazorPay_Key_Id;

            res.status(200).json({ key, order }).end();
          } else {
            res.status(406).json({ message: "Something Went Wrong" }).end();
          }
        } else {
          res.status(400).json({ message: "Not" }).end();
        }
      } else {
        res.status(400).json({ message: "Invalid Address Format" });
      }
    }
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

/*
 * This handler handles verifying payment and adding items in user's orders.
 * send POST Request at /api/v1/order/VerifyPayment
 */

export const verifyPaymentHandler = async (req: Request, res: Response) => {
  try {
    if (!process.env.RazorPay_Key_Secret) {
      throw new Error(
        "RazorPay_Key_Secret environment variable is not defined"
      );
    }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;
    const data = razorpay_order_id + "|" + razorpay_payment_id;
    const hmac = crypto.createHmac("sha256", process.env.RazorPay_Key_Secret);
    hmac.update(data);
    const generated_signature = hmac.digest("hex");
    if (generated_signature === razorpay_signature) {
      const user = await Users.findById(req.headers["user"]).populate(
        "lockedOrders.item"
      );
      if (user) {
        user.lockedOrders.map(async (lockedOrder: any) => {
          const order = new Orders({
            orderedBy: {
              name: user.firstName + " " + user.lastName,
              mobile: user.mobile,
            },
            product: {
              title: lockedOrder.item.title,
              image: lockedOrder.item.image,
              quantity: lockedOrder.quantity,
              price: lockedOrder.item.currentPrice,
              _id: lockedOrder.item._id,
            },
            deliveryAddress: req.body.deliveryAddress,
            priceDetails: {
              deliveryCharge: 45,
              discount: 0,
              totalAmount:
                lockedOrder.item.currentPrice * lockedOrder.quantity + 45,
            },
            paymentId: razorpay_payment_id,
          });
          await order.save();

          await user.updateOne({ $addToSet: { orders: order } });
          await user.updateOne({ $pull: { cart: { _id: lockedOrder._id } } });
        });
      }

      res.status(201).json({
        message: "Order Placed Successful",
      });
    } else {
      res.status(400).json({ message: "Transaction failed" });
    }
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

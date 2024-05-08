import { Users } from "../models/user.model";
import { Request, Response } from "express";
import { addressValidation } from "common";
import { fromZodError } from "zod-validation-error";

/*
 * All the routes related to address are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 */

/*
 * This handler handles getting user's all addresses.
 * send GET Request at /api/v1/address/myaddress
 */

export const getAddressHandler = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.headers["user"]);

    if (user) {
      res.json({ address: user.address || [] });
    } else {
      res
        .status(404)
        .json({ message: "Something Went Wrong!, Try to Login Again" });
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
 * This handler handles adding items to user's address.
 * send POST Request at /api/v1/address/newaddress
 * body contains {NewAddress}
 */

export const addAddressHandler = async (req: Request, res: Response) => {
  const validAddress = addressValidation.safeParse(req.body);

  if (validAddress.success) {
    try {
      const user = await Users.findById(req.headers["user"]);

      if (user) {
        if (user.address.length <= 4) {
          user.address.push(validAddress.data);
          await user.save();
          const addressId = user.address[user.address.length - 1]._id;

          res
            .status(201)
            .json({ message: "Address Saved Successfully", addressId });
        } else {
          res.status(405).json({ message: "You Can Only Add Upto 5 Address" });
        }
      } else {
        res
          .status(404)
          .json({ message: "Something Went Wrong!, Try to Login Again" });
      }
    } catch (error: any) {
      if (error.message) {
        res.status(406).json({ message: error.message }).end();
      } else {
        res.status(500).json({ message: "Something Went Wrong" });
      }
    }
  } else {
    res.status(400).json(fromZodError(validAddress.error));
  }
};

/*
 * This handler handles updating details in user's address.
 * send PUT Request at /api/v1/address/:AddressId
 * body contains {UpdatedAddress}
 */

export const updateAddressHandler = async (req: Request, res: Response) => {
  const validAddress = addressValidation.safeParse(req.body);

  if (validAddress.success) {
    try {
      const user = await Users.findById(req.headers["user"]);

      if (user) {
        // Updating Every Element Seperately to not let mongodb Generate a New Id for the Same Address

        await user.updateOne(
          {
            $set: {
              "address.$[item].name": validAddress.data.name,
              "address.$[item].mobile": validAddress.data.mobile,
              "address.$[item].street": validAddress.data.street,
              "address.$[item].city": validAddress.data.city,
              "address.$[item].state": validAddress.data.state,
              "address.$[item].country": validAddress.data.country,
              "address.$[item].pincode": validAddress.data.pincode,
            },
          },
          { arrayFilters: [{ "item._id": req.params.AddressId }] }
        );

        res.status(200).json({ message: "Address Updated Successfully" });
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
  } else {
    res.status(400).json(fromZodError(validAddress.error));
  }
};

/*
 * This handler handles removing items to user's address.
 * send DELETE Request at /api/v1/address/:AddressId
 */
export const removeAddressHandler = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.headers["user"]);

    if (user) {
      const removeResponse = await user.updateOne({
        $pull: { address: { _id: req.params.AddressId } },
      });

      if (removeResponse.modifiedCount) {
        res.status(200).json({ message: "Address Removed Successfully" });
      } else {
        res.status(200).json({ message: "Address not Found" });
      }
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

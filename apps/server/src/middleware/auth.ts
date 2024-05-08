import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Users } from "../models/user.model";

export const authenticateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      const decodedToken = jwt.verify(
        token,
        String(process.env.ACCESS_TOKEN_SECRET)
      );
      if (decodedToken && typeof decodedToken !== "string") {
        const user = await Users.findById(decodedToken?.id);

        if (!user) {
          res.status(401).json({ message: "Invalid Access Token" }).end();
        }

        req.headers["user"] = decodedToken.id;
        next();
      }
    } else {
      res.status(401).json({ message: "failed to authenticate" }).end();
    }
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

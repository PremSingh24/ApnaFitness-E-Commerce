import jwt from "jsonwebtoken";
import { Users } from "../models/user.model";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { registerUserValidation, loginUserValidation } from "common";
import { fromZodError } from "zod-validation-error";
import mongoose from "mongoose";

/*
 *** All the routes related to Authentication are present here ***
 */

// This handler verifies the user's session on its arrival .

export const authenticateUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.headers["user"]);
    if (user) {
      const { firstName, lastName, mobile, email } = user;
      const sendUser = { firstName, lastName, mobile, email };
      res.status(200).json({ sendUser }).end();
    }
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

// This function generates Access And Refresh Token for the user during Register and login .

const generateRefreshAndAccessToken = async (id: mongoose.Types.ObjectId) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      throw new Error("User Not Found!");
    }
    const accessToken = jwt.sign(
      { id },
      String(process.env.ACCESS_TOKEN_SECRET),
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { id },
      String(process.env.REFRESH_TOKEN_SECRET),
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something Went Wrong!");
  }
};
/*
 * This handler handles user signup.
 * send POST Request at /api/v1/auth/register
 * body contains {firstName, LastName, mobile, email(optional), password}
 */

export const registerUserHandler = async (req: Request, res: Response) => {
  const registerUser = registerUserValidation.safeParse(req.body);

  if (!registerUser.success) {
    return res
      .status(400)
      .json({ message: fromZodError(registerUser.error).message.toString() })
      .end();
  }
  try {
    //check if Mobile Number or email already exists in DB

    const mobileTaken = await Users.findOne({
      mobile: registerUser.data.mobile,
    });

    if (mobileTaken) {
      return res
        .status(409)
        .json({ message: "Mobile Number Already Exists" })
        .end();
    }

    if (registerUser.data.email) {
      // if email is entered in the form
      const emailTaken = await Users.findOne({
        email: registerUser.data.email,
      });
      if (emailTaken) {
        return res
          .status(409)
          .json({ message: "Email is Already Registered" })
          .end();
      }
      //Add the User In DB
      registerUser.data.password = await bcrypt.hash(
        registerUser.data.password,
        10
      );
      Object.assign(registerUser.data, { refreshToken: "empty" });

      const newUser = new Users(registerUser.data);
      await newUser.save();

      const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
        newUser?._id
      );

      newUser.refreshToken = refreshToken;
      await newUser.save();

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        SameSite: "none",
      };

      res
        .status(201)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({ message: "User Created successfully" });
    } else {
      //Add the User In DB
      registerUser.data.password = await bcrypt.hash(
        registerUser.data.password,
        10
      );

      Object.assign(registerUser.data, { refreshToken: "empty" });

      const newUser = new Users(registerUser.data);
      await newUser.save();

      const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
        newUser?._id
      );

      newUser.refreshToken = refreshToken;
      await newUser.save();

      res
        .status(201)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({ message: "User Created successfully" });
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
 * This handler handles user logins.
 * send POST Request at /api/v1/user/login
 * body contains {Mobile Number/email, password}
 */

export const loginUserHandler = async (req: Request, res: Response) => {
  const loginUser = loginUserValidation.safeParse(req.body);

  if (!loginUser.success) {
    return res.status(411).json(fromZodError(loginUser.error));
  }
  try {
    //Verify Email/Mobile Entered Exists
    const user = await Users.findOne({
      $or: [{ email: loginUser.data.email }, { mobile: loginUser.data.email }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Mobile Number or Email Id" });
    }
    // Verify the Password

    const passwordMatched = await bcrypt.compare(
      loginUser.data.password,
      user.password
    );

    if (!passwordMatched) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
      user._id
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "Logged in successfully" });
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

/*
 * This handler handles user logOuts.
 * send POST Request at /api/v1/user/logOut
 */

export const logOutHandler = async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ message: "logged Out Successfully" });
};

/*
 * This handler handles refresh user's accessToken.
 * send POST Request at /api/v1/user/refreshToken
 */

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      String(process.env.REFRESH_TOKEN_SECRET)
    );
    if (typeof decodedToken === "string") {
      throw new Error("Unauthorized Token");
    }

    const user = await Users.findById(decodedToken?.id);

    if (!user) {
      throw new Error("Invalid Refresh Token!");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      res.status(401).json("Refresh Token has Expired!").end();
    }

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
      user?._id
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "Logged in successfully" });
  } catch (error: any) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

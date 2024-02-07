import jwt from "jsonwebtoken";   
import { Users } from "../models/user.model";
import bcrypt from "bcrypt";
import {Request,Response} from "express";
import {registerUserValidation,loginUserValidation} from "common";
import { fromZodError } from "zod-validation-error";

/*
    *** All the routes related to Authentication are present here ***
*/


// This handler verifies the user's session on its arrival .

export const authenticateUserHandler = async(req:Request, res:Response) =>{
    const user = await Users.findById(req.headers["user"]);
    if(user){
        const {firstName,lastName,mobile,email} = user;
        const sendUser = {firstName,lastName,mobile,email} 
        res.status(200).json({sendUser}).end();

    }
    

}


/*
    * This handler handles user signups.
    * send POST Request at /api/v1/auth/register
    * body contains {firstName, LastName, mobile, email(optional), password}
*/ 

export const registerUserHandler = async(req:Request, res:Response) =>{

    const registerUser = registerUserValidation.safeParse(req.body);

    if(registerUser.success){
        console.log(registerUser)

        try{
            //check if Mobile Number or email already exists in DB
            
            const mobileTaken = await Users.findOne({mobile:registerUser.data.mobile});

            if(mobileTaken){
                res.status(409).json({message:"Mobile Number Already Exists"}).end();

            }else if(registerUser.data.email){
                const emailTaken = await Users.findOne({email:registerUser.data.email});
                if(emailTaken){
                    res.status(409).json({message:"Email is Already Registered"}).end();
                }else{

                    //Add the User In DB
                    registerUser.data.password = await bcrypt.hash(registerUser.data.password,10);
        
                    const newUser = new Users(registerUser.data);
                    await newUser.save();
                    const token = jwt.sign({id:newUser?._id},String(process.env.ACCESS_TOKEN_SECRET),{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
            
                    res.status(201).json({message:"User Created successfully", token}).end();
                    
                }

            }else{
            
                //Add the User In DB
                registerUser.data.password = await bcrypt.hash(registerUser.data.password,10);
        
                const newUser = new Users(registerUser.data);
                await newUser.save();
                const token = jwt.sign({id:newUser?._id},String(process.env.ACCESS_TOKEN_SECRET),{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
            
                res.status(201).json({message:"User Created successfully", token}).end();
            }
            
            
    
        }catch(error){
            res.status(500).json({message:"Something Went Wrong,Server Error"}).end();
            console.log(error)
            
        }

    }else{
        res.status(400).json({message:fromZodError(registerUser.error).message.toString()}).end();
        console.log(fromZodError(registerUser.error))
    }

}


/*
    * This handler handles user logins.
    * send POST Request at /api/v1/user/login
    * body contains {Mobile Number/email, password}
*/

export const loginUserHandler = async(req:Request, res:Response) =>{

    const loginUser = loginUserValidation.safeParse(req.body);

    if(loginUser.success){

        try{
            //Verify Email/Mobile Entered Exists
            const user = await Users.findOne({$or:[{email:loginUser.data.email}, {mobile:loginUser.data.email}]});
      
            if(user){
                // Verify the Password
                console.log("here")
                
                const passwordMatched = await bcrypt.compare(loginUser.data.password,user.password);
    
                if(passwordMatched){
                    const token = jwt.sign({id:user._id},String(process.env.ACCESS_TOKEN_SECRET),{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
                    await user.populate("cart.item");
                    await user.populate("wishlist");
                    await user.populate("address");

                    const cart = user.cart;
                    const wishlist = user.wishlist;
                    const address = user.address

                    const {firstName,lastName,mobile,email} = user;
                    const sendUser = {firstName,lastName,mobile,email}

                    res.status(200).json({ message: "Logged in successfully", token,cart,wishlist,address,sendUser});
    
                }else{
                    res.status(401).json({message:"Incorrect Password"});
                }  
            }else{
                res.status(401).json({message:"Invalid Mobile Number or Email Id"});
            }
            
        }catch(error){
            res.status(500).json({message:"Something Went Wrong",error});
    
        }

    }else{
        res.status(411).json(fromZodError(loginUser.error));
    }
    
}
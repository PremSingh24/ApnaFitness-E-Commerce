import jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express"


export const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      
      const token = authHeader.split(' ')[1];
      jwt.verify(token,String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
        if (err) {
          return res.status(403).end()
        }

        if(!user || typeof user === "string"){
          return res.status(403).end()
        }

        req.headers["user"] = user.id 
        next();
      });
    }else {
      res.sendStatus(401).json({message:"failed to authenticate"}).end();
    }
}


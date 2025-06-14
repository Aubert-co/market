import {Request,Response,NextFunction} from 'express'
import jwt,{JwtPayload} from "jsonwebtoken";


const secret = process.env.JWT_KEY
export interface MyJwtPayload extends JwtPayload{
    id:string
}
export class Auth {
    constructor(){}
    public  handler(req:Request,res:Response,next:NextFunction):any{
   
        if(!req.headers.authorization)return res.status(401).json({message: "Access Denied"});
        
        const authHeader = req.headers.authorization;
        
        const parts = authHeader.split(' ');

        if (parts.length !== 2) return res.status(401).json({message:"Invalid token format"});
    
        const [scheme, token] = parts;
  
        if (!/^Bearer$/i.test(scheme) ) return res.status(401).json({ message: 'Invalid token format' });
    
   
        if(!secret)return res.status(500).json({message:'An unexpected error occurred. Please try again later.'});

        try{
            const decoded = jwt.verify(token, secret) as MyJwtPayload;
            if (!decoded || !decoded.id || isNaN(Number(decoded.id))) {
                return res.status(400).json({ message: 'Invalid token' });
            }
            req.user = Number(decoded.id) 
            next();
        }catch(err:any){
           return res.status(400).json({message:'Invalid token'});
 
        }
    
    }
}
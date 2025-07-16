import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { IUserService } from "../Services/UserService";
import { generateAccessToken } from "../Helpers/AuthTokens";

export class RefreshTokenController{
    constructor(protected user:IUserService){}

  public async handler(req:Request,res:Response):Promise<any>{
    
  const refreshToken = req.cookies?.refresh;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as { id: string };

    const user = await this.user.findUserById(Number(decoded.id))

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = generateAccessToken(user.id)

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15 
    });

     res.status(200).json({ message: "New access token issued successfully" });

    } catch (err:any) {
      res.status(401).json({ message: "Invalid or expired refresh token" });
    }
    }
}
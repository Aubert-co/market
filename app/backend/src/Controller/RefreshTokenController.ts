import {  Request, Response } from "express";

import { IUserService } from "../Services/UserService";


export class RefreshTokenController{
    constructor(protected user:IUserService){}

  public async handler(req:Request,res:Response):Promise<any>{
    
  const refreshToken = req.cookies?.refresh;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
  
    const newAccessToken = await this.user.checkTheUserId(refreshToken)

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
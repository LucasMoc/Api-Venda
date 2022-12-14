import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void{
  const authHeader =  req.headers.authorization;

  if(!authHeader){
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try{
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken;

    req.user = { id : sub? sub.toString() : ''};

    return next();
  }catch{
    throw new AppError('Invalid JWT Token!');
  };
};

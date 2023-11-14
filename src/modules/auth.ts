import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

interface User {
  id: string;
  username: string;
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJwt = (user: User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_KEY must be defined");
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  console.log(bearer);

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!bearer) {
    res.status(401);
    res.send("Not authorized bearer");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("here");
    res.status(401);
    res.send("Not valid token");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    (req as any).user = payload;
    console.log(payload);
    console.log(token, process.env.JWT_SECRET);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized Error");
    return;
  }
};

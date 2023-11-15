import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

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

export const handleInputErrot = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};

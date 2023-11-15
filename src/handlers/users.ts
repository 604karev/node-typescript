import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword, createJwt, comparePassword } from "../modules/auth";

const prisma = new PrismaClient();

export const createNewUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJwt(user);
  res.json({ token });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });
 
  if (!user) return;

  const isValid = await comparePassword(req.body.password, user.password);
  console.log(req.body.password, user.password)

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJwt(user);
  res.json({ token });
};
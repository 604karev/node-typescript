import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

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

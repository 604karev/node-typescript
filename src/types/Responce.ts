import { User } from "@prisma/client";
import { Response } from "express";

interface ResponseWithUser extends Response {}

export default ResponseWithUser;

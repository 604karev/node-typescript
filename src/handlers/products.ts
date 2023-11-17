import { Request, Response } from "express";
import prisma from "../db";
import { User } from "@prisma/client";


interface RequestWithUser extends Request {
  user: User;
}

export const getProducts = async (req: RequestWithUser, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user?.products });
};

export const getOneProduct = async (req: RequestWithUser, res: Response) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const createProduct = async (req: RequestWithUser, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.body.user.id,
    },
  });
  res.json({ data: product });
};

export const updateProduct = async (req: RequestWithUser, res: Response) => {
  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.body.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: product });
};

export const deleteProduct = async (req: RequestWithUser, res: Response) => {
  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.body.user.id,
      },
    },
  });
  res.json({ data: product });
};

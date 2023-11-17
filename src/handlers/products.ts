import prisma from "../db";
import { Request, Response } from "../model";

export const getProducts = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user?.products });
};

export const getOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user?.id,
    },
  });
  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user!.id,
    },
  });
  res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user!.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user!.id,
      },
    },
  });
  res.json({ data: product });
};

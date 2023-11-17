import prisma from "../db";
import { ProductWithUpdates, Request, Response } from "../types";

export const getUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user?.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((acc: any[], cur: ProductWithUpdates) => {
    return [...acc, cur.updates];
  }, []);

  res.json({ data: updates });
};

export const getOneUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.id,
    },
  });
  if (!product) {
    return res.json({ message: "nope" });
  }
  const update = await prisma.update.create({
    data: req.body,
  });
  res.json({ data: update });
};

export const updateUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user?.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((acc: any[], cur: ProductWithUpdates) => {
    return [...acc, cur.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "Nope" });
  }
  const updateUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updateUpdate });
};

export const deleteUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user?.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((acc: any[], cur: ProductWithUpdates) => {
    return [...acc, cur.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "Nope" });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};

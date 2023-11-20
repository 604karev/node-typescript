import { Update } from "@prisma/client";
import { ProductWithUpdates, Request, Response } from "./types";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const checkUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user?.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((acc: Update[], cur: ProductWithUpdates) => {
    return [...acc, ...cur.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "Nope" });
  }
};

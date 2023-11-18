import { Update } from "@prisma/client";
import prisma from "./db";
import { ProductWithUpdates, Request, Response } from "./types";

const checkUpdates = async (req: Request, res: Response) => {
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

export default checkUpdates;

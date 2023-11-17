import { Product, Update } from "@prisma/client";

interface ProductWithUpdates extends Product {
  updates: Update[];
}

export default ProductWithUpdates;

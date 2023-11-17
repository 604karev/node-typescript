import { Request, Response, Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrot } from "./modules/middleware";
import { getOneProduct, getProducts } from "./handlers/products";

const router = Router();
/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", (req, res) => {});

router.post(
  "/product",
  body("name").isString(),
  handleInputErrot,
  (req: Request, res: Response) => {}
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrot,
  (req: Request, res: Response) => {}
);

router.delete("/product/:id", (req, res) => {});

/**
 * Update
 */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  (req, res) => {}
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPED", "DEPRECATED", "ARCHIVED"]),
  body("version").optional(),
  (req, res) => {}
);

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").isString(),
  body("updateId").isString(),
  (req, res) => {}
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;

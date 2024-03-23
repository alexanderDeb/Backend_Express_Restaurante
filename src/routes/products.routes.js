import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", authRequired, getProducts);
router.get("/product/:id", authRequired, getProduct);
router.post("/product", authRequired, createProduct);
router.delete("/product/:id", authRequired, deleteProduct);
router.put("/product/:id", authRequired, updateProduct);

export default router;

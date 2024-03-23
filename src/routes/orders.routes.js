import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getOrder,
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/orders", authRequired, getOrders);
router.get("/order/:id", authRequired, getOrder);
router.post("/order", authRequired, createOrder);
router.delete("/order/:id", authRequired, deleteOrder);
router.put("/order/:id", authRequired, updateOrder);

export default router;

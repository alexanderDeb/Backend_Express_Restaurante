import express from "express";
import morgan from "morgan";
import { ConnectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import productRoutes from "./routes/products.routes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", ordersRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

ConnectDB();
app.listen(8000);
console.log("Server on port", 8000);

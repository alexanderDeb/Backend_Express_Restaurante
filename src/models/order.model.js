import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    mesa: { type: String, require: true },
    productosid: { type: Array, require: true },
    nota: { type: String },
    total: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

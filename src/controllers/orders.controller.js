import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(order);
};

export const createOrder = async (req, res) => {
  const { userid, mesa, productosid, nota, total } = req.body;
  const newOrder = new Order({ userid, mesa, productosid, nota, total });
  const saveOrder = await newOrder.save();
  res.json(saveOrder);
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(order);
};

export const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(order);
};

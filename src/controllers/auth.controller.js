import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { name, email, password, status, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hash, status, role });

    const userSave = await newUser.save();
    const token = await createAccessToken({ id: userSave._id });
    res.cookie("token", token);
    res.json({
      id: userSave._id,
      name: userSave.name,
      email: userSave.email,
      status: userSave.status,
      role: userSave.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "user not found" });

    const ismatch = await bcrypt.compare(password, userFound.password);
    if (!ismatch)
      return res.status(400).json({ message: "incorrect password" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      email: userFound.email,
      status: userFound.status,
      name: userFound.name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFoun = await User.findById(req.user.id);
  if (!userFoun) return res.status(400).json({ message: "User not found" });
  return res.json({
    id: userFoun.id,
    name: userFoun.name,
    email: userFoun.email,
    status: userFoun.status,
    role: userFoun.role,
  });
};

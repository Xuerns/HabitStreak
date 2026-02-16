import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server Error" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server Error" });
  }
};

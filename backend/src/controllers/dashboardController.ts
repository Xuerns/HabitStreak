import { Request, Response } from "express";
import { dashboardService } from "../services/dashboardService";

export const dashboardController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const result = await dashboardService(userId);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

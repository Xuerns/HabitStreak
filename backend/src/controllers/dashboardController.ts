import { Request, Response } from "express";
import { dashboardService } from "../services/dashboardService";

// ambil data untuk dashboard (streak, longest_streak, precetage, remaining to 70, and totalhabit)
export const dashboardController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const result = await dashboardService(userId);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

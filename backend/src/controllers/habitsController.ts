import type { Request, Response } from "express";
import {
  completeHabitsService,
  createHabitsService,
  deleteHabitsService,
  getHabitsService,
  updateHabitsService,
} from "../services/habitsService";

// Create Habits
export const createHabits = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const result = await createHabitsService(req.body, userId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server Error" });
  }
};

// Get Habits
export const getHabits = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const result = await getHabitsService(userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Habits
export const updateHabits = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  try {
    const result = await updateHabitsService(req.body, userId, id);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server Error" });
  }
};

// Delete
export const deleteHabits = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  try {
    const result = await deleteHabitsService(userId, id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Complete Habits
export const completeHabits = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  try {
    const result = await completeHabitsService(userId, id)
    res.status(200).json(result)
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "habits sudah diselesaikan hari ini" });
    }
    const status = error.status || 500
    res.status(status).json({ message: error.message || "Server Error" });
  }
};

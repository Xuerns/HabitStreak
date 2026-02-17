import { Router } from "express";
import {
  completeHabits,
  createHabits,
  deleteHabits,
  getHabits,
  undoHabit,
  updateHabits,
} from "../controllers/habitsController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createHabits);
router.get("/", authMiddleware, getHabits);
router.put("/:id", authMiddleware, updateHabits);
router.delete("/:id", authMiddleware, deleteHabits);
router.post("/:id/completed", authMiddleware, completeHabits);
router.delete("/:id/completed", authMiddleware, undoHabit);

export default router;

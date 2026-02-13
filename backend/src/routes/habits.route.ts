import { Router } from "express"
import { createHabits, deleteHabits, getHabits, toggleHabits, updateHabits } from "../controllers/habitsController"
import authMiddleware from "../middleware/authMiddleware"

const router = Router()

router.post("/", authMiddleware, createHabits)
router.get("/", authMiddleware, getHabits)
router.put("/:id", authMiddleware, updateHabits)
router.delete("/:id", authMiddleware, deleteHabits)
router.patch("/:id/toggle", authMiddleware, toggleHabits)

export default router;
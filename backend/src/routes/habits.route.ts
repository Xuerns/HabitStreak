import { Router } from "express"
import { createHabits, deleteHabits, getHabits, updateHabits } from "../controllers/habitsController"
import authMiddleware from "../middleware/authMiddleware"

const router = Router()

router.post("/", authMiddleware, createHabits)
router.get("/", authMiddleware, getHabits)
router.put("/:id", authMiddleware, updateHabits)
router.delete("/:id", authMiddleware, deleteHabits)

export default router;
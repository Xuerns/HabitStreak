import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";
import { dashboardController } from "../controllers/dashboardController";

const router = Router()

router.get("/", authMiddleware, dashboardController)

export default router;
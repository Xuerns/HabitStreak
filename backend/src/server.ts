import dotenv from "dotenv";
dotenv.config();
import type { Response, Request } from "express";
const express = require("express");
import pool = require("./db");
import authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");

import authRoutes from "./routes/auth.route";
import habitsRoutes from "./routes/habits.route";
import dashboardRoutes from "./routes/dashboard.route";
import analyticsRoutes from "./routes/analytics.route";

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

// Routes
app.get("/mainpage", authMiddleware, async (req: Request, res: Response) => {
  const user = (req as any).user;

  const [row]: any = await pool.execute("SELECT * from user where id = ?", [
    user.id,
  ]);

  if (row.length === 0) {
    return res.status(401).json({ message: "user tidak terdaftar" });
  }

  res.json({ message: "berhasil akses profile", user: row[0] });
});

app.use("/auth", authRoutes);
app.use("/habits", habitsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/analytics", analyticsRoutes);

app.listen(port, () => {
  console.log(`Message: Server berjalan di Port ${port}`);
});

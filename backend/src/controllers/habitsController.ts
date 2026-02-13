import type { Request, Response } from "express";
import pool from "../db";

// Create Habits
export const createHabits = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    await pool.execute(
      "INSERT INTO habits (user_id, title, DESCRIPTION) VALUES (?, ?, ?)",
      [user.id, title, description],
    );
    res.json({message: "Berhasil membuat habits baru"});
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Habits
export const getHabits = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    const [data]: any = await pool.execute("SELECT * from habits WHERE user_id = ?", [user.id]);

    res.json(data);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Habits
export const updateHabits = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const [result] = await pool.execute(
      "UPDATE habits SET title = ?, DESCRIPTION = ? WHERE id = ? AND user_id = ?",
      [title, description, id, user.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({message: "habit tidak ditemukan"})
    }

    res.json({ message: "Berhasil Update habits" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete
export const deleteHabits = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  try {
    await pool.execute("DELETE FROM habits WHERE id = ? AND user_id = ?", [
      id,
      user.id,
    ]);

    res.json({ message: "Berhasil hapus habits" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

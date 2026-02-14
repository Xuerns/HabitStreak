import type { Request, Response } from "express";
import pool from "../db";
import { diff } from "node:util";

// Create Habits
export const createHabits = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    await pool.execute(
      "INSERT INTO habits (user_id, title, DESCRIPTION, completed) VALUES (?, ?, ?, false)",
      [user.id, title, description],
    );
    res.json({ message: "Berhasil membuat habits baru" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Habits
export const getHabits = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    const [data]: any = await pool.execute(
      "SELECT * from habits WHERE user_id = ?",
      [user.id],
    );

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
      return res.status(404).json({ message: "habit tidak ditemukan" });
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

// Complete Habits
export const completeHabits = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  try {
    // Ambil Habits
    const [rows] = await pool.execute(
      "SELECT streak, last_completed FROM habits WHERE user_id = ? AND id = ?",
      [user.id, id],
    );

    // Validasi apakah habit ada
    if (rows.length === 0) {
      return res.status(404).json({ message: "Habit tidak ditemukan" });
    }

    const habit = rows[0]; // deklarasi habit
    const todayStr = new Date().toISOString().split("T")[0]; 

    // Insert habits log
    await pool.execute("INSET INTO habits_logs (id, DATE) VALUES (?, ?)", [
      id,
      todayStr,
    ]);

    // initial habitstreak
    let HabitStreak = 1;

    // Validasi apakah habits sudah melewati batas waktu
    if (habit.last_completed) {
      const lastDate = new Date(habit.last_completed);
      const different =
        lastDate.getTime() - new Date().getTime() - 1000 * 60 * 60 * 24;

      if (different === 1) {
        HabitStreak = habit.streak + 1;
      }
    }

    // Update streak dan last_completed
    await pool.execute(
      "UPDATE habits SET streak = ?, last_completed = ? WHERE id = ?",
      [HabitStreak, todayStr, id],
    );
    res.json({message: "habits Complete", Streak: HabitStreak})
  } catch (error: any) {
    // Cek apakah duplikat
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({message: "Habits udah diselesaikan"})
    }
    res.status(500).json({message: "Server Error"})
  }
};

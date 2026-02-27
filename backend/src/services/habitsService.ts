import pool from "../db";

// Create Habit
export const createHabitsService = async (data: any, id: number) => {
  if (!data.title || !data.description) {
    throw { status: 400, message: "Data tidak lengkap" };
  }

  await pool.execute(
    "INSERT INTO habits (title, DESCRIPTION, user_id) VALUES (?, ?, ?)",
    [data.title, data.description, id],
  );
  return { message: "Berhasil menambahkan habits" };
};

// Get Habit
export const getHabitsService = async (id: number) => {
  const [habitsData] = await pool.execute(
    "SELECT * FROM habits WHERE user_id = ?",
    [id],
  );
  return habitsData;
};

// Update Habit
export const updateHabitsService = async (
  data: any,
  userId: number,
  habitsId: any,
) => {
  if (!data.title || !data.description) {
    throw { status: 400, message: "Data tidak lengkap" };
  }

  const result = await pool.execute(
    "UPDATE habits SET title = ?, DESCRIPTION = ? WHERE id = ? AND user_id = ?",
    [data.title, data.description, habitsId, userId],
  );

  if (result.affectedRows === 0) {
    throw { status: 404, message: "Habit tidak ditemukan" };
  }

  return { message: "Berhasil update habit" };
};

// Delete habit
export const deleteHabitsService = async (userId: number, habitId: any) => {
  await pool.execute("DELETE FROM habits WHERE id = ? AND user_id = ?", [
    habitId,
    userId,
  ]);
  return { message: "Berhasil menghapus habit" };
};

// Complete habit
export const completeHabitsService = async (userId: number, habitId: any) => {
  const [rowsHabits]: any = await pool.execute(
    "SELECT title FROM habits WHERE id = ? AND user_id = ?",
    [habitId, userId],
  );

  if (!rowsHabits) {
    throw { status: 404, message: "habit tidak ditemukan" };
  }

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  await pool.execute(
    "INSERT INTO habits_logs (DATE, habits_id) VALUES (?, ?)",
    [todayStr, habitId],
  );

  // Catat Activity Log
  await pool.execute(
    "INSERT INTO activity_logs (user_id, habits_id, action) VALUES (?, ?, 'complete')",
    [userId, habitId],
  );

  const [rowsTotal]: any = await pool.execute(
    "SELECT COUNT(*) as total FROM habits WHERE user_id = ?",
    [userId],
  );

  const total = rowsTotal[0].total;

  if (total === 0) {
    throw { message: "Tidak ada habit", precentage: 0, streak: 0 };
  }

  const [completedRows]: any = await pool.execute(
    "SELECT COUNT(*) as completed FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND hl.DATE = ?",
    [userId, todayStr],
  );

  const completed = completedRows[0].completed;
  const precentage = (completed / total) * 100;

  const [rowsStreak]: any = await pool.execute(
    "SELECT streak, last_streak_date, longest_streak FROM user WHERE id = ?",
    [userId],
  );
  const currentStreak = rowsStreak[0].streak || 0;
  const longestStreak = rowsStreak[0].longest_streak || 0;
  const rawLastStreak = rowsStreak[0].last_streak_date;
  let currentStreakDate: string | null = null;
  if (rawLastStreak) {
    const day = new Date(rawLastStreak);
    currentStreakDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
  }

  let newStreak = currentStreak;
  let newLongestStreak = longestStreak;

  if (precentage >= 70) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
    if (currentStreakDate === todayStr) {
      newStreak = currentStreak;
    } else if (currentStreakDate === yesterdayStr) {
      newStreak = currentStreak + 1;
    } else {
      newStreak = 1;
    }

    if (newStreak > newLongestStreak) {
      newLongestStreak = newStreak;
      await pool.execute(
        "UPDATE user SET streak = ?, last_streak_date = ?, longest_streak = ? WHERE id = ?",
        [newStreak, todayStr, newLongestStreak, userId],
      );
    } else {
      await pool.execute(
        "UPDATE user SET streak = ?, last_streak_date = ? WHERE id = ?",
        [newStreak, todayStr, userId],
      );
    }
  }

  return { message: "habit completed", streak: newStreak, precentage };
};

// Undo Habits
export const undoHabitService = async (userId: number, habitId: any) => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  await pool.execute(
    "DELETE hl FROM habits_logs AS hl INNER JOIN habits AS h ON hl.habits_id = h.id WHERE hl.habits_id = ? AND h.user_id = ? AND hl.DATE = ?",
    [habitId, userId, todayStr],
  );

  await pool.execute(
    "INSERT INTO activity_logs (user_id, habits_id, action) VALUES (?, ?, 'undo')",
    [userId, habitId],
  );

  const [completedhabit]: any = await pool.execute(
    "SELECT COUNT(*) as completed from habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND hl.DATE = ?",
    [userId, todayStr],
  );
  const [totalhabitToday]: any = await pool.execute(
    "SELECT COUNT(*) as total from habits WHERE user_id = ?",
    [userId],
  );
  const [streakRows]: any = await pool.execute(
    "SELECT streak, last_streak_date from user WHERE id = ?",
    [userId],
  );

  const completed = completedhabit[0].completed;
  const total = totalhabitToday[0].total;
  const last = new Date(streakRows[0].last_streak_date);
  const lastStr = `${last.getFullYear()}-${String(last.getMonth() + 1).padStart(2, "0")}-${String(last.getDate()).padStart(2, "0")}`;

  const precentage = (completed / total) * 100;
  const todayStreak = streakRows[0].streak;

  if (precentage < 70 && lastStr === todayStr) {
    let newStreak = Math.max(0, todayStreak - 1);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdaystr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

    const newStreakDate = todayStreak > 0 ? yesterdaystr : null;

    await pool.execute(
      "UPDATE user set streak = ?, last_streak_date = ? WHERE id = ?",
      [newStreak, newStreakDate, userId],
    );
  }

  // Re-fetch the final streak after potential update
  const [updatedStreak]: any = await pool.execute(
    "SELECT streak FROM user WHERE id = ?",
    [userId],
  );
  const finalStreak = updatedStreak[0].streak || 0;

  return { message: "berhasil undo", streak: finalStreak, precentage };
};

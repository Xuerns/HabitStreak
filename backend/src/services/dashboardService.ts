import pool from "../db";

export const dashboardService = async (userId: number) => {

  // ambil streak, dan longest_streak pada user
  const [streakRows]: any = await pool.execute(
    "SELECT streak, longest_streak FROM user WHERE id = ?",
    [userId],
  );

  const streak = streakRows[0].streak || 0;
  const longestStreak = streakRows[0].longest_streak || 0;

  // ambil totalhabit yang dimiliki user
  const [totalRows]: any = await pool.execute(
    "SELECT COUNT(*) as totalHabits from habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ?",
    [userId],
  );
  const totalHabit = totalRows[0].totalHabits;

  // ambil total habit hari ini yang sudah complete
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [completedRows]: any = await pool.execute(
    "SELECT COUNT(*) as totalToday FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND hl.DATE = ?",
    [userId, todayStr],
  );
  const todayCompleted = completedRows[0].totalToday;

  // ambil total habit yang dimiliki pengguna pada hari ini
  const [totalTodayRows]: any = await pool.execute(
    "SELECT COUNT(*) as habitTotal FROM habits WHERE user_id = ?",
    [userId],
  );

  const habitstotalToday = totalTodayRows[0].habitTotal;
  if (habitstotalToday === 0) {
    return {
      streak,
      longestStreak,
      totalHabit,
      precentage: 0,
      remainingTo70: 70,
    };
  }

  const precentage = (todayCompleted / habitstotalToday) * 100;
  const remainingTo70 = precentage >= 70 ? "Selesai" : 70 - precentage;

  return { streak, longestStreak, totalHabit, precentage, remainingTo70 };
};

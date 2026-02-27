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
      remainingTo70: "Tidak Ada Habit",
      weeklyChart: [],
    };
  }
  // Menghitung presentase hari ini
  const precentage = (todayCompleted / habitstotalToday) * 100;
  const remainingTo70 = precentage >= 70 ? "Selesai" : 70 - precentage;

  // Ambil daftar habit dengan statusnya untuk hari ini
  const [todayHabitsRows]: any = await pool.execute(
    "SELECT h.id, h.title, IF(hl.DATE IS NOT NULL, true, false) as is_completed FROM habits h LEFT JOIN habits_logs hl ON h.id = hl.habits_id AND hl.DATE = ? WHERE h.user_id = ?",
    [todayStr, userId],
  );
  const todayHabits = todayHabitsRows.map((row: any) => ({
    ...row,
    is_completed: !!row.is_completed,
  }));

  // Ambil 3 daftar habit yang paling sering dikerjakan
  const [topHabitsRows]: any = await pool.execute(
    "SELECT h.id, h.title, h.DESCRIPTION, COUNT(hl.habits_id) as total_completed from habits h LEFT JOIN habits_logs hl ON h.id = hl.habits_id WHERE h.user_id = ? GROUP BY h.id ORDER BY total_completed DESC LIMIT 3 ",
    [userId],
  );
  const topHabits = topHabitsRows;

  // Ambil rekap penyelesaian habit dengan jangka 30 hari terakhir
  const [heatmapRows]: any = await pool.execute(
    "SELECT DATE_FORMAT(hl.DATE, '%Y-%m-%d') as date, COUNT(*) as count FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND hl.DATE >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY DATE_FORMAT(hl.DATE, '%Y-%m-%d') ORDER BY date ASC",
    [userId],
  );
  const heatmap = heatmapRows;

  // ambil data untuk weekly chart
  const DayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const mondayStr = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
  const sundayStr = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, "0")}-${String(sunday.getDate()).padStart(2, "0")}`;

  const [weeklyRow]: any = await pool.execute(
    "SELECT DATE_FORMAT(hl.`DATE`, '%Y-%m-%d') as date, COUNT(*) as total FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND hl.`DATE` >= ? AND hl.`DATE` <= ? GROUP BY DATE_FORMAT(hl.`DATE`, '%Y-%m-%d') ORDER BY date ASC",
    [userId, mondayStr, sundayStr],
  );

  const weeklyChart = DayNames.map((day, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const found = weeklyRow.find((row: any) => row.date === dateStr);
    return { day, total: found ? found.total : 0 };
  });

  return {
    streak,
    longestStreak,
    totalHabit,
    precentage,
    remainingTo70,
    todayHabits,
    topHabits,
    heatmap,
    weeklyChart,
  };
};

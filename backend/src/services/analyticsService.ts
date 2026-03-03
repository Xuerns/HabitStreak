import pool from "../db";

export const analyticService = async (
  userId: number,
  numberShow: number,
  month: string,
  year: string,
) => {
  // mengambil total hari yang sudah tercataa sejak pertama kali dibuat
  const [totalDaysRows]: any = await pool.execute(
    "SELECT DATEDIFF(CURDATE(), MIN(DATE)) as totalDays FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ?",
    [userId],
  );

  // ambil streak terkini
  const [currentRows]: any = await pool.execute(
    "SELECT streak FROM user WHERE id = ?",
    [userId],
  );

  // overall Rate Complete habit
  const [overallRows]: any = await pool.execute(
    "SELECT COUNT(hl.id) as totalCompleted, (SELECT COUNT(*) FROM habits WHERE user_id = ?) as totalHabits FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ?",
    [userId, userId],
  );

  // ambil completed habit dan total habit perhari
  const [completionRows]: any = await pool.execute(
    "SELECT date_format(hl.DATE, '%Y-%m-%d') as date, COUNT(*) as completed FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND hl.DATE >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY date ORDER BY date",
    [userId, numberShow],
  );

  // Ambil hari dimana habits full diselesaikan
  const [perfectRows]: any = await pool.execute(
    "SELECT COUNT(*) as perfectDays FROM (SELECT hl.DATE, COUNT(hl.id) as completed FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? GROUP BY hl.DATE HAVING completed >= (SELECT COUNT(*) FROM habits WHERE user_id = ?)) as perfect",
    [userId, userId],
  );

  // Ambil rate habit yang pernah di selesaikan
  const [rateCompletetionRows]: any = await pool.execute(
    "SELECT h.id, h.title, COUNT(hl.id) AS completed,  DATEDIFF(CURDATE(), h.create_at) + 1 AS total_days FROM habits h LEFT JOIN habits_logs hl ON h.id = hl.habits_id WHERE h.user_id = ? GROUP BY h.id, h.title, h.create_at ORDER BY COUNT(hl.id) / (DATEDIFF(CURDATE(), h.create_at) + 1) DESC;",
    [userId],
  );

  // Ambil riwayat untuk mothly heatmap
  const [monthlyRows]: any = await pool.execute(
    "SELECT DATE_FORMAT(hl.date, '%Y-%m-%d') as date, COUNT(*) as count FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND MONTH(hl.DATE) = ? AND YEAR(hl.DATE) = ? GROUP BY date ORDER BY date",
    [userId, month, year],
  );

  const totalDays = totalDaysRows[0]?.totalDays || 0;
  const currentStreak = currentRows[0]?.streak || 0;
  const overall = overallRows[0]?.totalCompleted || 0;
  const totalHabits = overallRows[0]?.totalHabits || 0;
  const perfect = perfectRows[0]?.perfectDays || 0;

  return {
    summaryStats: { totalDaysTracked: totalDays, overall, totalHabits, perfect, currentStreak },
    completionTrend: completionRows,
    perHabitRate: rateCompletetionRows,
    monthlyHeatMap: monthlyRows,
  };
};

import pool from "../db";

export const analyticService = async (userId: number, numberShow: number) => {
  // mengambil total hari yang sudah tercataa sejak pertama kali dibuat
  const [totalDaysRows]: any = await pool.execute(
    "SELECT DATEDIFF(CURDATE(), MIN(DATE)) as totalDays FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ?",
    [userId],
  );

  // ambil streak terkini
  const [currentRows]: any = await pool.execute(
    "SELECT streak FROM user WHERE id = ",
    [userId],
  );

  // ambil completed habit dan total habit perhari
  const [completionRows]: any = await pool.execute(
    "SELECT date_format(hl.DATE, '%Y-%m-%d') as date, COUNT(*) as completed FROM habits_logs hl JOIN habits h ON hl.habits_id = h.id WHERE h.user_id = ? AND hl.DATE >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY date ORDER BY date",
    [userId, numberShow],
  );
};

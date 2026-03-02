import { Response, Request } from "express";
import { analyticService } from "../services/analyticsService";

export const analyticsController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const period = parseInt(req.query.period as string) || 30;
  const monthParam =
    (req.query.month as string) ||
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
  const [year, month] = monthParam.split('-');
    try {
    const data = await analyticService(userId, period, month, year);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

import {Response, Request} from 'express'
import { analyticService } from '../services/analyticsService'

export const analyticsController = async (req: Request, res: Response) => {
    const userId = (req as any).id;
    try {
        const data = await analyticService(userId);
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
}
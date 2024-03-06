import { Request, Response } from "express"
import DashboardService from "../services/DashboardService";

class DashboardController {
    static async budgetsStatus(req: Request, res: Response) {
        const dashboarService = new DashboardService();
        const data = await dashboarService.budgetsStatus()
        return res.status(200).json(data)
    }
}

export default DashboardController
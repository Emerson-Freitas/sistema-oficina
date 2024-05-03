import { Request, Response } from "express"
import DashboardService from "../services/DashboardService";

class DashboardController {
    static async budgetsStatus(req: Request, res: Response) {
        const dashboarService = new DashboardService();
        const data = await dashboarService.budgetsStatus()
        return res.status(200).json(data)
    }
    
    static async infoDashboardAdmin(req: Request, res: Response) {
        try {
            const dashboardService = new DashboardService();
            const data = await dashboardService.infoDashboardAdmin();

            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json({ message: "Erro ao consultar informações do dashboard" })
        }
    }
}

export default DashboardController
import { Request, Response } from "express";
import NotificationService from "../services/NotificationService";

class NotificationController {
    
    static async notificationsByUserClient(req: Request, res: Response) {
        try {
            const { id } = req.params as any
            const notificationService = new NotificationService()
            const notifications = await notificationService.notificationsByUserClient(id)
            
            return res.status(200).json(notifications)
        } catch (error: any) {
            console.log("error.message", error.message)
            return res.status(400).json({ message: "Erro ao consultar as notificações do cliente"})
        }
    }

    static async notificationsAdminAndEmployee(req: Request, res: Response) {
        try {
            const notificationService = new NotificationService()
            const notifications = await notificationService.notificationsAdminAndEmployee()
            
            return res.status(200).json(notifications)
        } catch (error: any) {
            return res.status(400).json({ message: "Erro ao consultar as notificações do admin/funcionario"})
        }
    }
}

export default NotificationController
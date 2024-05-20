import { Request, Response } from "express";
import BudgetService from "../services/BudgetService";
import VehicleService from "../services/VehicleService";

class VehicleController {
    static async createVehicle(req: Request, res: Response) {
        try {
            const { name, plate, color, userId, vehicleType } = req.body
            const vehicleService = new VehicleService();
            const data = await vehicleService.createVehicle({ name, plate, color, userId })

            return res.status(200).json({ message: `Veículo cadastrado com sucesso!`})
        } catch (error: any) {
            return res.status(400).json({ message: `Erro ao cadastrar o veículo` })
        }
    }

    static async findVehicles(req: Request, res: Response) {
        try {
            const { id } = req.params as any
            const vehicleService = new VehicleService();
            const data = await vehicleService.findVehicles({ id });
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({ message: `${error.message}` })
        }
    }

    static async findVehiclesClient(req: Request, res: Response) {
        try {
            const { user_id } = req.body
            const vehicleService = new VehicleService();
            const data = await vehicleService.findVehiclesClient({ user_id });
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json({ message: `Erro ao consultar os veículos` })
        }
    }

    static async vehiclesByUser(req: Request, res: Response) {
        try {
            const { id } = req.params as any
            const vehicleService = new VehicleService()
            const data = await vehicleService.vehiclesByUser(id)
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json({ message: `Erro ao consultar os veículos criados` })
        }
    }
}

export default VehicleController
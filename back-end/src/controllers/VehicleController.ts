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
}

export default VehicleController
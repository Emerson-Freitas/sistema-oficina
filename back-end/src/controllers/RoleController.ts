import { Request, Response } from "express";
import RoleService from "../services/RoleService";

class RoleController {
    static async findRoles(req: Request, res: Response) {
        try {
            const roleService = new RoleService();
            const roles = await roleService.findRoles()
    
            return res.status(200).json(roles)
        } catch (error: any) {
            console.log(error.message)
            return res.status(400).json({ message: "Erro ao consultar as funções do usúario" })
        }
    }
}

export default RoleController
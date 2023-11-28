import { Request, Response } from "express";
import RoleService from "../services/RoleService";

class RoleController {
    static async findRoles(req: Request, res: Response) {
        const roleService = new RoleService();
        const roles = await roleService.findRoles()

        return res.status(201).json(roles)
    }
}

export default RoleController
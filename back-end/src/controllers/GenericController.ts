import { Request, Response } from "express"
import GenericService from "../services/GenerericService";

class GenericController{
    static async genericDelete(req: Request, res: Response) {
        const { table, id } : string | any = req.params;

        const genericService = new GenericService();
        const data = await genericService.deleteRegister({table, id})

        return res.status(200).json(data)
    }
}

export default GenericController
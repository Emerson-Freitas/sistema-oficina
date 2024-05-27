import { Request, Response } from "express"
import GenericService from "../services/GenerericService";

class GenericController{
    static async genericDelete(req: Request, res: Response) {
        try {
            const { table, id } : string | any = req.params;
    
            const genericService = new GenericService();
            const data = await genericService.deleteRegister({table, id})
    
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({ message: `${error.message}` })
        }
    }
}

export default GenericController
import { Request, Response } from "express"
import UserService from "../services/UserService"

class UserController {
    
    static async createUser(req: Request, res: Response) {

        try {
            const { name, cpf, telephone, email, password, role_id } = req.body
            const userService = new UserService();
            const user = await userService.createUser({name, cpf, telephone, email, password, role_id});
        
            return res.status(201).json({message: `Usuário ${user.name} foi cadastrado com sucesso!`})
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
        
    }

    static async editUser(req: Request, res: Response) {

        try {
            const { id, name, cpf, telephone, email } = req.body
            const userService = new UserService();
            const user = await userService.editUser({name, cpf, telephone, email, id});
        
            return res.status(201).json({message: `Usuário ${user.name} foi editado com sucesso!`})
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
        
    }

    static async findUsers(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const users = await userService.findUsers();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.send(400).json({ message: error.message})
        }
        
    }

    static async findClients(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const users = await userService.findClients();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.send(400).json({ message: error.message})
        }
        
    }
}

export default UserController
import { Request, Response } from "express"
import AuthService from "../services/AuthService"

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const authService = new AuthService();
            const user = await authService.login({ email, password })

            return res.status(200).json(user)
        } catch (error: any) {
            console.log('error.message', error.message)
            return res.status(401).json({ message: error.message })
        }
    }

    static async getProfile(req: Request, res: Response) {
        return res.status(200).json(req.user)
    }
}

export default AuthController
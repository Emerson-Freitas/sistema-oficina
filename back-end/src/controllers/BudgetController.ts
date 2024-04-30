import { Request, Response } from "express";
import BudgetService from "../services/BudgetService";
import SocketService from "../services/SocketService";
import { BudgetSocket } from "../services/BudgetService";

class BudgetController {

    static async createBudget(req: Request, res: Response) {
        try {
            const { value, description, selectedClient} = req.body
            const budgetService = new BudgetService();
            await budgetService.createBudget({ value, description, selectedClient })

            return res.status(200).json({ message: `Orçamento cadastrado com sucesso!`})
        } catch (error: any) {
            return res.status(400).json({ message: `Erro ao cadastrar o orçamento` })
        }
    }

    static async findBudgets(req: Request, res: Response) {
        try {
            const { skip, take } = req.query
            const budgetService = new BudgetService();
            const data = await budgetService.findBudgets({skip, take})

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({ message: `Erro ao consultar orçamentos` })
        }
    }

    static async findBudgetsByUser(req: Request, res: Response) {
        try {
            const { id } = req.params as any
            const { take, skip } = req.query
            const budgetService = new BudgetService();
            const data = await budgetService.findBudgetsByUser({ id, take, skip })

            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json({ message: "Erro ao consultar os orçamentos do usuário"})
        }
    }

    static async infoDashboardAdmin(req: Request, res: Response) {
        try {
            const budgetService = new BudgetService();
            const data = await budgetService.infoDashboardAdmin();

            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json({ message: "Erro ao consultar informações do dashboard" })
        }
    }

    static async editBudget(req: Request, res: Response) {
        const { id, value, description, vehicle } = req.body
        // console.log("data>>>>", req.body)
        return true
    }
}

export default BudgetController
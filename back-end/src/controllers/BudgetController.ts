import { Request, Response } from "express";
import BudgetService from "../services/BudgetService";

class BudgetController {
    static async createBudget(req: Request, res: Response) {
        try {
            const { value, description, selectedClient} = req.body
            const budgetService = new BudgetService();
            const data = await budgetService.createBudget({ value, description, selectedClient })

            return res.status(200).json({ message: `Orçamento cadastrado com sucesso!`})
        } catch (error: any) {
            return res.status(400).json({ message: `Erro ao cadastrar o orçamento` })
        }
    }

    static async findBudgets(req: Request, res: Response) {
        try {
            const budgetService = new BudgetService();
            const data = await budgetService.findBudgets()

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({ message: `Erro ao consultar orçamentos` })
        }
    }
}

export default BudgetController
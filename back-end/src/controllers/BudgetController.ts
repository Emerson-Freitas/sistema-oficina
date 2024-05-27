import { Request, Response } from "express";
import BudgetService from "../services/BudgetService";
import SocketService from "../services/SocketService";
import { BudgetSocket } from "../services/BudgetService";

class BudgetController {
    static async createBudget(req: Request, res: Response) {
        try {
            const { value, description, selectedClient, selectedVehicle } = req.body
            const budgetService = new BudgetService();
            await budgetService.createBudget({ value, description, selectedClient, selectedVehicle })
            return res.status(200).json({ message: `Orçamento cadastrado com sucesso!`})
        } catch (error: any) {
            return res.status(400).json({ message: `Erro ao cadastrar o orçamento` })
        }
    }

    static async findBudgets(req: Request, res: Response) {
        try {
            const { skip, take, queryInput } = req.query
            const { id } = req.user
            const budgetService = new BudgetService();
            const data = await budgetService.findBudgets({skip, take, queryInput, id})

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

    static async editBudget(req: Request, res: Response) {
       try {
            const { id, value, description, vehicle } = req.body
            const budgetService = new BudgetService()
            const data = await budgetService.editBudget({ id, value, description, vehicle })
            return res.status(200).json({ message: `Orçamento: ${data.description} foi atualizado com sucesso!`})
       } catch (error) {
            return res.status(400).json({ message: "Erro ao atualizar o orçamento"})
       }
    }

    static async acceptBudget(req: Request, res: Response) {
        try {
            const { id } = req.params as any
            const budgetService = new BudgetService()
            const data = await budgetService.acceptBudget({ id })
            return res.status(200).json({ message: `Orçamento: ${data.description} foi aceito com sucesso!`} )
        } catch (error) {
            return res.status(400).json({ message: "Erro ao aceitar o orçamento" })
        }
    }

    static async rejectBudget(req: Request, res: Response) {
        try {
            const { id } = req.params as any
            const budgetService = new BudgetService()
            const data = await budgetService.rejectBudget({ id })
            return res.status(200).json({ message: `Orçamento: ${data.description} foi rejeitado com sucesso!`} )
        } catch (error) {
            return res.status(400).json({ message: "Erro ao rejeitar o orçamento" })
        }
    }

    static async findBudgetsByVehicle(req: Request, res: Response) {
        try {
            const { id } = req.params as any
            const budgetService = new BudgetService()
            const data = await budgetService.findBudgetsByVehicle({ id })
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json({ message: "Erro ao consultar os orçamentos deste veículo" })
        }
    }
}

export default BudgetController
import prismaClient from "../prisma"

interface BudgetRequest {
    value: number 
    description: string 
    selectedClient: string
}

class BudgetService {
    async createBudget({ value, description, selectedClient}: BudgetRequest) {
        const budget = await prismaClient.budget.create({
            data: {
                value: value,
                description: description,
                user_id: selectedClient
            }
        })
        return budget 
    }
}

export default BudgetService
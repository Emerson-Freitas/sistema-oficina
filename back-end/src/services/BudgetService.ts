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
                user_id: selectedClient,
                vehicle_id: '134c056c-1997-4e45-85fe-6299ed29d1f6'
            }
        })
        return budget 
    }

    async findBudgets() {
        const budgets = await prismaClient.budget.findMany({
            select: {
                id: true,
                description: true,
                value: true,
                user_id: true,
                vehicle: {
                    select: {
                        name: true
                    }
                },
                created_at: true
            },
            orderBy: {
                created_at: "asc"
            }
        })
        return budgets
    }
}

export default BudgetService
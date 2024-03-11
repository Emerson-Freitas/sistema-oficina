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
            }
        })
        return budget 
    }

    async findBudgets({skip, take}: any) {
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
            },
            skip: Number(skip),
            take: Number(take)
        })

        const totalCount = await prismaClient.budget.count();
        const totalPages = Math.ceil(totalCount / take)

        return {
            budgets,
            count: totalCount,
            totalPages
        }
    }

    async findBudgetsByUser({ id, take = 5, skip = 0 }: any) {
        const [budgets, totalCount] = await Promise.all([
            prismaClient.budget.findMany({
                select: {
                    id: true,
                    description: true,
                    created_at: true,
                    status: true,
                    vehicle: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
                        }
                    }
                },
                where: {
                    user_id: id
                },
                take: Number(take),
                skip: Number(skip)
            }),
            prismaClient.budget.count({
                where: {
                    user_id: id
                }
            })
        ]);

        const totalPages = Math.ceil(totalCount / Number(take));
    
        return { budgets, totalCount, totalPages };
    }
}

export default BudgetService
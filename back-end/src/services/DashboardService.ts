import { Prisma } from "@prisma/client";
import prismaClient from "../prisma";
import dayjs from 'dayjs';

class DashboardService {
    async budgetsStatus() {
        const dateIni = dayjs().subtract(3, 'month').toString()
        const dateEnd = dayjs().toString();

        const where: Prisma.BudgetWhereInput = {
            created_at: {
                lte: new Date(dateIni),
                gte: new Date(dateEnd)
            }
        };
        
        const statusCount = await prismaClient.budget.groupBy({
            by: ['status'],
            _count: {
                status: true
            },
            where
        })

        return statusCount
    }   

    async infoDashboardAdmin() {
        const dateInit = dayjs().subtract(1, "year").toDate();
        const dateEnd = dayjs().toDate();
    
        const where: Prisma.BudgetWhereInput = {
          created_at: {
            gte: dateInit,
            lte: dateEnd,
          },
        };
    
        const budgetsByStatus = await prismaClient.budget.groupBy({
          by: ["status"],
          _count: {
            status: true,
          },
          where: where,
        });
    
        const resultObject: Record<string, number> = {};
        budgetsByStatus.forEach((item) => {
            resultObject[item.status] = item._count.status;
        });

        return resultObject;
      }
}

export default DashboardService;

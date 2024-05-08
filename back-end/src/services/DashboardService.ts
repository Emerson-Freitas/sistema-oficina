import { Prisma } from "@prisma/client";
import prismaClient from "../prisma";
import dayjs from 'dayjs';
import _ from 'lodash'

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

      async dataGraph() {
        const dateInit = dayjs().subtract(1, "year").startOf('month').toDate();
        const dateEnd = dayjs().endOf('month').toDate();
    
        const where: Prisma.BudgetWhereInput = {
          created_at: {
            gte: dateInit,
            lte: dateEnd,
          },
        };

        const budgets = await prismaClient.budget.findMany({
            select: {
              created_at: true,
              status: true
            },
            where: where
        });

        const budgetsFormatDate = budgets.map((budget) => ({
          status: budget.status,
          created_at: dayjs(budget.created_at).format("MMM")
        }))

        const budgetsByStatusAndMonth = _.groupBy(budgetsFormatDate, "created_at")
        const allStatus: string[] = ['EM ANÁLISE', 'ACEITO', 'REJEITADO'];
        const sumByMonth: any = {};
        
        Object.keys(budgetsByStatusAndMonth).forEach(month => {
            const statusCounts: any = {};
            allStatus.forEach(status => {
                statusCounts[status] = 0;
            });
            budgetsByStatusAndMonth[month].forEach(budget => {
                const status = budget.status;
                if (statusCounts[status]) {
                    statusCounts[status]++;
                } else {
                    statusCounts[status] = 1;
                }
            });
            sumByMonth[month.toLowerCase()] = statusCounts;
        });

        const monthsOrder = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        const orderedData = _.sortBy(Object.entries(sumByMonth), ([month]) => {
          return monthsOrder.indexOf(month);
        });

        const orderedObject = _.fromPairs(orderedData);

        return orderedObject
    }
}

export default DashboardService;

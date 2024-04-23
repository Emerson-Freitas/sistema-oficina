import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import prismaClient from "../prisma";
import { Prisma } from "@prisma/client";
import { io } from "../../server";
import { Socket } from "socket.io";

interface BudgetRequest {
  value: number;
  description: string;
  selectedClient: string;
}

class BudgetService {
  async createBudget({ value, description, selectedClient }: BudgetRequest) {
    const budget = await prismaClient.budget.create({
      data: {
        value: value,
        description: description,
        user_id: selectedClient,
      },
    });

    const user = await prismaClient.user.findFirst({
      where: {
        id: budget.user_id,
        role: {
          name: "CLIENTE"
        }
      },
      select: {
        name: true
      }
    });
    
    if (!user) {
      return budget;
    } else {
      const { description, created_at } = budget
      const userName = user.name
      const newBudget = { description, created_at, userName }

      io.emit("create budget", newBudget)
      return budget
    }
  }

  async findBudgets({ skip, take }: any) {
    const budgets = await prismaClient.budget.findMany({
      select: {
        id: true,
        description: true,
        value: true,
        user_id: true,
        vehicle: {
          select: {
            name: true,
          },
        },
        created_at: true,
      },
      orderBy: {
        created_at: "asc",
      },
      skip: Number(skip),
      take: Number(take),
    });

    const totalCount = await prismaClient.budget.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      budgets,
      count: totalCount,
      totalPages,
    };
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
            },
          },
        },
        where: {
          user_id: id,
        },
        take: Number(take),
        skip: Number(skip),
      }),
      prismaClient.budget.count({
        where: {
          user_id: id,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / Number(take));

    return { budgets, totalCount, totalPages };
  }

  async infoDashboardAdmin() {
    const dateInit = dayjs().subtract(1, "year").toDate();
    const dateEnd = dayjs().toDate();

    // console.log({
    //     dateInit, dateEnd
    // })
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

    // console.log("budgetsByStatus>>>>", budgetsByStatus);

    return budgetsByStatus;
  }
}

export default BudgetService;

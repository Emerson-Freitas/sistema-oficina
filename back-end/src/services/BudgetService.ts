import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import prismaClient from "../prisma";
import { Prisma } from "@prisma/client";
import { io } from "../../server";
import { Socket } from "socket.io";
import SocketService from "./SocketService";
import { userIds as socketIds } from "../../server";
import NotificationService from "./NotificationService";

interface BudgetRequest {
  value: number;
  description: string;
  selectedClient: string;
}

export type Budget = {
    id: string;
    description: string;
    value: Prisma.Decimal;
    vehicle_id: string;
    user_id: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export type BudgetSocket = {
    description: string;
    created_at: Date;
    userName: string | undefined;
}

class BudgetService {
  private readonly socketService = new SocketService();
  private readonly notificationService = new NotificationService();

  async createBudget({ value, description, selectedClient }: BudgetRequest) {
    const budget: Budget = await prismaClient.budget.create({
      data: {
        value: value,
        description: description,
        user_id: selectedClient,
      },
    });

    const user = await prismaClient.user.findFirst({
      where: {
        id: budget.user_id,
      },
      select: {
        name: true,
        role: {
          select: {
            name: true
          }
        }
      }
    });

    if (user?.role.name === "CLIENTE") {
      const { user_id, description, created_at } = budget
      const userName = user?.name
      const newBudget = { description, created_at, userName }
      const connectedUserIds = socketIds.map(user => user.userId)

      const usersToNotify = await prismaClient.user.findMany({
        where: {
          id: {
            in: connectedUserIds
          },
          role: {
            OR: [
              { name: "FUNCIONARIO" },
              { name: "ADMIN" }
            ]
          }
        },
        select: {
          id: true
        }
      });

      const userIds = usersToNotify.map(user => {
        const socketUser = socketIds.find(socketUser => socketUser.userId === user.id);
        return socketUser?.socketId;
      }).filter(Boolean);

      await this.notificationService.createNotification({ user_id, description })
      this.socketService.notificationAllUsers("create budget", newBudget, userIds)

      return newBudget
    } 
    
    return budget;
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
}

export default BudgetService;

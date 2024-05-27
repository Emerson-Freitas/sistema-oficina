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
  selectedVehicle: string;
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

interface IUpdateBudget {
  id: string
  value: string | number
  description: string
  vehicle: string
}

interface IFindBudget {
  role: string
  id: string
  query: string
}

interface IFindBudgetsByVehicle {
  id: string
}

class BudgetService {
  private readonly socketService = new SocketService();
  private readonly notificationService = new NotificationService();

  async createBudget({ value, description, selectedClient, selectedVehicle }: BudgetRequest) {
    const budget: Budget = await prismaClient.budget.create({
      data: {
        vehicle_id: selectedVehicle,
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
            name: true,
          },
        },
      },
    });

    if (user?.role.name === "CLIENTE") {
      const { user_id, description, created_at } = budget;
      const userName = user?.name;
      const newBudget = { description, created_at, userName };
      const connectedUserIds = socketIds.map((user) => user.userId);

      const usersToNotify = await prismaClient.user.findMany({
        where: {
          id: {
            in: connectedUserIds,
          },
          role: {
            OR: [{ name: "FUNCIONARIO" }, { name: "ADMIN" }],
          },
        },
        select: {
          id: true,
        },
      });

      const userIds = usersToNotify
        .map((user) => {
          const socketUser = socketIds.find(
            (socketUser) => socketUser.userId === user.id
          );
          return socketUser?.socketId;
        })
        .filter(Boolean);

      await this.notificationService.createNotification({
        user_id,
        description,
      });
      this.socketService.notificationAllUsers(
        "create budget",
        newBudget,
        userIds
      );

      return newBudget;
    }

    return budget;
  }

  async findBudgetsUser({ id, role, query }: IFindBudget) {
    let ids: any;
    if (role !== "CLIENTE") {
      ids = await prismaClient.$queryRaw<{ id: number }[]>`
          SELECT id FROM "budgets"
          WHERE "description" LIKE ${query} 
          OR "value"::text LIKE ${query}
          OR "created_at"::text LIKE ${query}
          OR UPPER("status") LIKE UPPER(${query})
        `;
    } else {
      ids = await prismaClient.$queryRaw<{ id: number }[]>`
          SELECT id FROM "budgets"
          WHERE "user_id" = ${id}
          AND (
            "description" LIKE ${query} 
            OR "value"::text LIKE ${query}
            OR "created_at"::text LIKE ${query}
            OR UPPER("status") LIKE UPPER(${query})
          )
      `;
    }

    return ids;
  }

  async findBudgets({ skip, take, queryInput, id }: any) {
    let where: any;
    queryInput = queryInput.trim();

    const roleUser = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
      select: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    const role = roleUser?.role.name;

    if (role === "CLIENTE") {
      where = {
        user_id: id,
      };
    }

    if (queryInput && role) {
      const query = `%${queryInput}%`;
      const ids = await this.findBudgetsUser({ id, role, query });
      if (ids.length > 0) {
        where = {
          id: {
            in: ids.map((row: any) => row.id),
          },
        };
      }
    }

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
        status: true,
      },
      where: where,
      orderBy: {
        created_at: "asc",
      },
      skip: Number(skip),
      take: Number(take),
    });

    let totalCount: number;
    let totalPages: number;

    if (role !== "CLIENTE") {
      totalCount = queryInput
        ? budgets.length
        : await prismaClient.budget.count();
      totalPages = Math.ceil(totalCount / take);
    } else {
      totalCount = queryInput
        ? budgets.length
        : await prismaClient.budget.count({
            where: {
              user_id: id,
            },
          });
      totalPages = Math.ceil(totalCount / take);
    }

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

  async editBudget({ id, value, description, vehicle }: IUpdateBudget) {
    if (!id) {
      throw new Error("O id do orçamento é obrigatório");
    }

    if (!value) {
      throw new Error("O valor do orçamento é obrigatório");
    }

    if (!description) {
      throw new Error("A descrição do orçamento é obrigatório");
    }

    if (!vehicle) {
      throw new Error("O veículo relacionado a esse orçamento é obrigatório");
    }

    const budget = await prismaClient.budget.update({
      where: {
        id: id,
      },
      data: {
        value,
        description,
        vehicle: {
          update: {
            name: vehicle,
          },
        },
      },
      select: {
        description: true,
      },
    });

    return budget;
  }

  async acceptBudget({ id }: any) {
    if (!id) {
      throw new Error("Erro ao aceitar o orçamento");
    }

    const budget = await prismaClient.budget.findFirst({
      where: {
        id,
      },
      select: {
        description: true,
      },
    });

    if (!budget) {
      throw new Error("Erro ao aceitar o orçamento");
    }

    if (budget) {
      await prismaClient.budget.update({
        where: {
          id,
        },
        data: {
          status: "ACEITO",
        },
      });
    }

    return budget;
  }

  async rejectBudget({ id }: any) {
    if (!id) {
      throw new Error("Erro ao rejeitar o orçamento");
    }

    const budget = await prismaClient.budget.findFirst({
      where: {
        id,
      },
      select: {
        description: true,
      },
    });

    if (!budget) {
      throw new Error("Erro ao rejeitar o orçamento");
    }

    if (budget) {
      await prismaClient.budget.update({
        where: {
          id,
        },
        data: {
          status: "REJEITADO",
        },
      });
    }

    return budget;
  }

  async findBudgetsByVehicle({ id }: IFindBudgetsByVehicle) {
    const budgets = await prismaClient.budget.findMany({
      where: {
        vehicle_id: id,
      },
      select: {
        id: true,
        description: true,
      },
    });

    const data = budgets.map((budget) => {
      return {
        label: budget.description,
        value: budget.id,
      };
    });
    return data;
  }
}

export default BudgetService;

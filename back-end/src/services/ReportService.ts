import { Prisma } from "@prisma/client";
import prismaClient from "../prisma";
import GenerateExcel from "./GenerateExcel";
import fs from 'fs';
import { Response } from "express";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

interface Request {
    dateInit: Date | string;
    dateEnd: Date | string;
    res: Response
}

class ReportService {
    async generateExcelReport({ dateInit, dateEnd, res }: Request) {
        const formatDateInit = dayjs(dateInit).utc().local().format();
        const formatDateEnd = dayjs(dateEnd).utc().local().format();

        const where: Prisma.BudgetWhereInput = {
            created_at: {
                lte: formatDateInit,
                gte: formatDateEnd
            }
        };

        const data = await prismaClient.budget.findMany({
            select: {
                description: true,
                value: true,
                user: {
                    select: {
                        name: true
                    }
                },
                created_at: true,
                vehicle: {
                    select: {
                        name: true
                    }
                },
                status: true
            },
            where: where
        });

        const values = data.map((budget) => {
            return {
                description: budget.description,
                value: budget.value,
                name: budget.user.name,
                created_at: budget.created_at,
                vehicle: budget.vehicle.name,
                status: budget.status
            }
        })

        const { filePath, fileName } = await GenerateExcel.createExcelFile({ values, res })

        return {
            fileName, filePath
        }
    }
}

export default ReportService;

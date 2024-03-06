import { Prisma } from "@prisma/client";
import prismaClient from "../prisma";
import dayjs from 'dayjs';
import GenerateExcel from "./GenerateExcel";
import fs from 'fs';

interface Request {
    dateInit: Date | string;
    dateEnd: Date | string;
}

class ReportService {
    async generateExcelReport({ dateInit, dateEnd }: Request) {
        const where: Prisma.BudgetWhereInput = {
            created_at: {
                lte: new Date(dateInit),
                gte: new Date(dateEnd)
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
            // where: where
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

        const { fileName, filePath } = await GenerateExcel.createExcelFile(values)
        
        const file = fs.readFile(filePath, (err, data) => {
            if (err) console.log(err);
        });

        return file
    }
}

export default ReportService;

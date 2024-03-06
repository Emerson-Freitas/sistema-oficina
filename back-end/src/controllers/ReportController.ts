import { Request, Response, NextFunction} from "express"
import ReportService from "../services/ReportService"
import fs from 'fs';
import path from 'path'

class ReportController{
    static async reportExcel(req: Request, res: Response, next: NextFunction) {
        try {
            const { dateInit, dateEnd } = req.body;
            const reportService = new ReportService();
            const file = await reportService.generateExcelReport({ dateInit, dateEnd });

            console.log("file>>>", file)
            // fs.readFile('relatorio-orcamento-31-01-2024-21-42-54.xlsx', (err, data) => {
            //     if (err) console.log(err)
            //     console.log(data)
            // })

            res.send(file)
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: `Erro ao gerar relatório em excel!` });
        }
    }
}

export default ReportController
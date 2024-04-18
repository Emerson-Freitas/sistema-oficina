import { Request, Response } from "express";
import ReportService from "../services/ReportService";
import fs from "fs";
import dayjs from "dayjs";
import xl from "excel4node";
import * as path from "path";

class ReportController {
  static async reportExcel(req: Request, res: Response) {
    try {
      const { dateInit, dateEnd } = req.query as any;
      const reportService = new ReportService();
      const { fileName, filePath } = await reportService.generateExcelReport({ dateInit, dateEnd, res });

      const waitForDownload = () => {
        return new Promise((resolve: any) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      };

      await waitForDownload();

      res.setHeader("Content-Disposition","attachment; filename=" + fileName);

      res.download(filePath, fileName, (err) => {
        if (err) throw new Error("Erro ao consultar o arquivo excel: " + fileName) 
      });

      // res.status(200).send({ fileName: fileName })

    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: `Erro ao gerar relatório em excel!` });
    }
  }
}

export default ReportController;

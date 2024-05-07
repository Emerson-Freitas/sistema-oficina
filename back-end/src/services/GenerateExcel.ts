import dayjs from 'dayjs'
import xl from 'excel4node'
import { Response } from 'express'
import fs from 'fs'
import * as path from 'path'

interface IUser {
    name: string
}

interface IVehicle {
    name: string
}

interface Params {
    values: any
    res: Response
}

const headerColumns = ["description", "value", "user", "created_at", "vehicle", "status"]

class GenerateExcel {
    static async createExcelFile({ values, res }: Params) {
        const wb = new xl.Workbook({
            dateFormat: "dd/mm/yyyy hh:mm:ss"
        })
        const ws = wb.addWorksheet("Relatório de Orçamento")
        const style = wb.createStyle({
            font: {
                color: "#FF0800",
                size: 12,
            },
            // numberFormat: '$#,##0.00; ($#,##0.00); -',
        })

        let colIndex = 1
        headerColumns.forEach((item: string) => {
            ws.cell(1, colIndex++).string(item)
        })

        let rowIndex = 2
        values.forEach((item: any) => {
            let columnIndex = 1
            Object.keys(item).forEach((colName: any) => {
                if (item[colName] instanceof Date) {
                    ws.cell(rowIndex, columnIndex++).date(item[colName]).style(style)
                }
                else if (typeof item[colName] === 'number') {
                    ws.cell(rowIndex, columnIndex++).number(item[colName]).style(style)
                } else {
                    ws.cell(rowIndex, columnIndex++).string(item[colName].toString()).style(style)
                }
            })
            rowIndex++;
        })

        const fileName = `relatorio-orcamento-${dayjs().format("DD-MM-YYYY-HH-mm-ss")}.xlsx`
        const filePath = path.join(__dirname, '..', 'excel', fileName)

        await wb.write(filePath);

        return {
            fileName, filePath
        }
    }
}

export default GenerateExcel
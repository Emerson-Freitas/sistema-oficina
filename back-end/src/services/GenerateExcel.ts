import dayjs from 'dayjs'
import xl from 'excel4node'
import fs from 'fs'
import * as path from 'path'

interface IUser {
    name: string
}

interface IVehicle {
    name: string
}

interface IReportBudget {
    description: string,
    value: number,
    user: IUser
    created_at: Date | string
    vehicle: IVehicle
    status: string
}

const headerColumns = ["description", "value", "user", "created_at", "vehicle", "status"]

class GenerateExcel {
    static async createExcelFile(data: any) {
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
        data.forEach((item: any) => {
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

        const fileName = `${dayjs().format("DD-MM-YYYY-HH-mm-ss")}.xlsx`
        const filePath = `./src/excel/relatorio-orcamento-${fileName}`
        
        await wb.write(path);
       
        return {
            fileName,
            filePath
        }
    }
}

export default GenerateExcel
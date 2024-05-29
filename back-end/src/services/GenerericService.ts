import prismaClient from "../prisma";

interface GenericRequest {
    table: string | any
    id: string | any
}

class GenericService {
    async deleteRegister({ table, id } : GenericRequest) {
        try {
            const result = await prismaClient.$queryRawUnsafe(`SELECT * FROM ${table} WHERE id = '${id}'`)

            if(!result) {
                throw new Error("Erro ao excluir o registro")
            }

            if (table === "vehicles") {
                const budgets = await prismaClient.budget.findMany({
                    where: {
                        vehicle_id: id
                    }
                })

                if (budgets) {
                    await prismaClient.budget.deleteMany({
                        where: {
                            vehicle_id: id
                        }
                    })
                    await prismaClient.$queryRawUnsafe(`DELETE FROM ${table} WHERE id = '${id}'`)
                }

            }
            
            await prismaClient.$queryRawUnsafe(`DELETE FROM ${table} WHERE id = '${id}'`)

            return {
                message: "Registro deletado com sucesso!"
            }

        } catch (error) {
            throw new Error("Erro ao excluir o registro")
        }
    }
}

export default GenericService
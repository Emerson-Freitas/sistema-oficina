import VehicleController from "../controllers/VehicleController"
import prismaClient from "../prisma"

interface VehicleRequest {
    name: string 
    plate: string 
    color: string
    userId: string
    vehicleType: string
}

interface FindVehiclesByUser {
    user_id: string
}

type Vehicle = {
    id: string;
    name: string;
    plate: string;
    color: string;
    user_id: string;
    type: string;
    created_at: Date;
}

interface RequestParams {
    id: string
    skip: string | number
    take: string | number
}

class VehicleService {
    async createVehicle({ name, plate, color, userId, vehicleType}: VehicleRequest) {
        const vehicle = await prismaClient.vehicle.create({
            data: {
                name, plate, color, user_id: userId, type: vehicleType
            }
        })
        return vehicle 
    }

    async findVehicles({ id }: any) {
        if (!id) {
            throw new Error("Erro ao consultar os veículos")
        }

        const vehicles = await prismaClient.vehicle.findMany({
            where: {
                user_id: id
            },
            select: {
                id: true,
                name: true
            },
        })

        if (vehicles.length === 0) {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: id
                },
                select: {
                    name: true
                }
            })

            throw new Error(`O usuário: ${user?.name} não possui nenhum veículo cadastrado`)
        }

        if (vehicles) {
            const data = vehicles.map((vehicle) => {
                return {
                    label: vehicle.name,
                    value: vehicle.id
                }
            })
            return data
        }
    }

    async findVehiclesClient({ user_id }: FindVehiclesByUser) {
        if (!user_id) {
            throw new Error("Erro ao consultar os veículos")
        }

        const vehicles = await prismaClient.vehicle.findMany({
            where: {
                user_id: user_id
            },
            select: {
                id: true,
                name: true
            },
        })

        const data = vehicles.map((vehicle) => {
            return {
                label: vehicle.name,
                value: vehicle.id
            }
        })

        return data
    }

    async vehiclesByUser({ id, skip, take }: RequestParams ) {
        skip = Number(skip)
        take = Number(take)

        if (!id) {
            throw new Error("Erro ao consultar os veículos do usuário")
        }

        const roleUser = await prismaClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })

        let vehicles: Vehicle[]
        let totalCount: number
        let totalPages: number

        if (roleUser?.role.name !== "CLIENTE") {
            totalCount = await prismaClient.vehicle.count()
            totalPages = Math.ceil(totalCount/take)

            vehicles = await prismaClient.vehicle.findMany({
                select: {
                    id: true,
                    name: true,
                    plate: true,
                    color: true,
                    user_id: true,
                    type: true,
                    created_at: true
                },
                skip: skip,
                take: take
            })

            return {
                vehicles,
                count: totalCount,
                totalPages
            }
        } 

        if (roleUser?.role.name === "CLIENTE") {
            totalCount = await prismaClient.vehicle.count({
                where: {
                    user_id: id
                }
            })

            totalPages = Math.ceil(totalCount/take)

            vehicles = await prismaClient.vehicle.findMany({
                where: {
                    user_id: id
                },
                select: {
                    id: true,
                    name: true,
                    plate: true,
                    color: true,
                    user_id: true,
                    type: true,
                    created_at: true
                },
                skip: skip,
                take: take
            })

            return {
                vehicles,
                count: totalCount,
                totalPages
            }
        }
    }

    async findTypes() {
        const data = await prismaClient.vehicle.findMany({
            select: {
                id: true,
                type: true
            }
        })

        return data
    }
}

export default VehicleService
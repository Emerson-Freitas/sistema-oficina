import VehicleController from "../controllers/VehicleController"
import prismaClient from "../prisma"

interface VehicleRequest {
    name: string 
    plate: string 
    color: string
    userId: string
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

class VehicleService {
    async createVehicle({ name, plate, color, userId }: VehicleRequest) {
        const vehicle = await prismaClient.vehicle.create({
            data: {
                name, plate, color, user_id: userId
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

    async vehiclesByUser(id: string) {
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

        if (roleUser?.role.name !== "CLIENTE") {
            vehicles = await prismaClient.vehicle.findMany({
                select: {
                    id: true,
                    name: true,
                    plate: true,
                    color: true,
                    user_id: true,
                    type: true,
                    created_at: true
                }
            })
            return vehicles
        } 

        if (roleUser?.role.name === "CLIENTE") {
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
                }
            })
            return vehicles
        }
    }
}

export default VehicleService
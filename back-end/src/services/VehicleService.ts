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

class VehicleService {
    async createVehicle({ name, plate, color, userId }: VehicleRequest) {
        const vehicle = await prismaClient.vehicle.create({
            data: {
                name, plate, color, user_id: userId
            }
        })
        return vehicle 
    }

    async findVehicles() {
        const vehicles = await prismaClient.vehicle.findMany({
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
}

export default VehicleService
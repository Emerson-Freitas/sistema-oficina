import VehicleController from "../controllers/VehicleController"
import prismaClient from "../prisma"

interface VehicleRequest {
    name: string 
    plate: string 
    color: string
    userId: string
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
}

export default VehicleService
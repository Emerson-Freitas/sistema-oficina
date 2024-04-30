import { Prisma } from "@prisma/client";
import { io } from "../../server"
import prismaClient from "../prisma"

class SocketService {
    notificationAllUsers(emitter: string, data: any, userIds: any) {
        userIds.forEach((userId: any) => {
            io.to(userId).emit(emitter, data);
        });
    }
}

export default SocketService;

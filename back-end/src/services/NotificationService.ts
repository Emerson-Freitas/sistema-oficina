import prismaClient from "../prisma"

interface INotification {
    user_id: string
    description: string
}

class NotificationService {
    async createNotification({ user_id, description }: INotification) {
        await prismaClient.notification.create({
            data: {
                user_id, 
                description
            }
        })
    }

    async notificationsByUserClient(user_id: string) {
        const notifications = await prismaClient.notification.findMany({
            where: {
                user_id
            },
            select: {
                description: true,
                created_at: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const newNotifications = notifications.map((n) => {
            return {
                description: n.description,
                created_at: n.created_at,
                userName: n.user.name
            }
        })

        return newNotifications 
    }

    async notificationsAdminAndEmployee() {
        const notifications = await prismaClient.notification.findMany({
            where: {
                user: {
                    role: {
                        OR: [
                            { name: "CLIENTE" },
                            { name: "FUNCIONARIO" },
                            { name: "ADMIN" }
                        ]
                    }
                }
            },
            select: {
                description: true,
                created_at: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const newNotifications = notifications.map((n) => {
            return {
                description: n.description,
                created_at: n.created_at,
                userName: n.user.name
            }
        })

        return newNotifications 
    }
}

export default NotificationService
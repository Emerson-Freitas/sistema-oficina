import prismaClient from "../prisma"

class RoleService {
    async findRoles() {
        const roles = await prismaClient.role.findMany({
            select: {
                id: true,
                name: true
            }
        })

        return roles
    }
}

export default RoleService
import { Api } from "../ApiConfig"
import { ApiException } from "../ApiException"

interface Params {
    id?: string
    token: string
}

const notificationsByUserClient = async ({ token, id }: Params) => {
    try {
        const { data } = await Api({ token }).get(`/notifications/${id}`)

        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar a API')
    }
}

const notificationsAdminAndEmployee = async ({ token }: Params) => {
    try {
        const { data } = await Api({ token }).get(`/notifications`)

        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar a API')
    }
}

export const NotificationService = {
    notificationsByUserClient,
    notificationsAdminAndEmployee
}
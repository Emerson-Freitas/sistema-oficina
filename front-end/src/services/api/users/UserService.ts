import IUser from "../../../interfaces/IUser";
import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface Params {
    skip: string | number
    take: string | number
    token: string
}

export interface Response {
    results: IUser[]
    totalPages: number
    count: number
}

const findUsers = async ({ skip, take, token } : Params): Promise<Response | ApiException> => {
    try {
        const { data } = await Api({ token }).get(`/users?skip=${skip}&take=${take}`)
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar a API')
    }
}

export const UserService = {
    findUsers
}
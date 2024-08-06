import { AxiosResponse } from "axios"
import { Api } from "../api/ApiConfig"
import { ApiException } from "../api/ApiException"

interface IUser {
    id: string
    name: string 
    cpf: string
    telephone: string
    email: string 
    created_at?: Date | string
    picture?: string
}

interface ILogin {
    email: string;
    password: string;
}

interface Params {
    token?: string
}

const doLogin = async (credentials: ILogin) : Promise<any | ApiException> => {
    try {
        const { data } = await Api({ token: null }).post(`/login`, credentials)
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Usuário ou Senha Incorreto!')
    }
}

const LoginService = {
    doLogin
};

export default LoginService;
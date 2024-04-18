import axios from "axios"

interface Params {
    token: string
}

export const Api = ({ token } : Params) => {
    return axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}`,
        headers: {
            Authorization: token
        }
    })
}

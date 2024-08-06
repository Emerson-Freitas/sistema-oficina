import axios from "axios"

interface Params {
    token?: string | null;
}

const BASE_URL = "http://192.168.1.31:3000"

export const Api = ({ token = null } : Params) => {
    const headers: { [key: string]: string | null } = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return axios.create({
        baseURL: BASE_URL,
        headers
    });
}

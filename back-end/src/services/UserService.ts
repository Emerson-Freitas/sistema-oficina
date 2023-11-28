import { Request, Response } from "express"
import prismaClient from "../prisma"
import bcrypt from 'bcrypt'

interface UserRequest {
    name: string
    cpf: string
    telephone: string
    email: string
    password: string
    role_id?: string
}

interface EditUserRequest {
    id: string, 
    cpf: string, 
    email: string, 
    telephone: string, 
    name: string
}

class UserService {
    async createUser({name, cpf, telephone, email, password, role_id} : UserRequest) {
        if(!name) {
            throw new Error("O nome do usuário é obrigatório")
        }

        if(!cpf) {
            throw new Error("O cpf do usuário é obrigatório")
        }

        if(!telephone) {
            throw new Error("O telefone do usuário é obrigatório")
        }

        if(!email) {
            throw new Error("O email do usuário é obrigatório")
        }

        if(!password) {
            throw new Error("A senha do usuário é obrigatória")
        }
        
        const existEmail = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            select: {
                email: true
            }
        })

        if(existEmail) {
            throw new Error(`Email em uso, por favor informe um email válido`)
        }

        if(!role_id) {
            role_id = "36a664f4-3f50-4575-b96b-c4f74b91f5ce";
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name,
                cpf,
                telephone,
                email,
                password: hashPassword,
                role: {
                    connect: {
                        id: role_id
                    }
                }
            },
        })

        return user
    }

    async findUsers() {
        const results = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                cpf: true,
                telephone: true,
                email: true,
                created_at: true,
                role: {
                    select: {
                        name: true
                    }
                }
            },
        })

        return results
    }

    async editUser({ id, cpf, email, telephone, name }: EditUserRequest) {

        if(!id) {
            throw new Error('Por favor, informe o id que deseja atualizar!')
        }

        if(!cpf) {
            throw new Error('O campo CPF é obrigatório!')
        }

        if(!email) {
            throw new Error('O campo email é obrigatório!')
        }

        if(!telephone) {
            throw new Error('O campo telefone é obrigatório!')
        }

        if(!name) {
            throw new Error('O campo nome é obrigatório!')
        }

        const findEmail = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            select: {
                email: true
            }
        })

        if(findEmail) {
            throw new Error(`Email em uso, por favor informe outro email!`)
        }

        const user = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                cpf: cpf,
                email: email,
                telephone: telephone,
                name: name
            },
            select: {
                name: true
            }
        })

        return user
    }
}

export default UserService
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

interface Upload {
    picture: string | undefined
    id: string | undefined
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
            throw new Error("A função do usuário é obrigatória!")
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

    async findClients() {
        const data = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
            },
            where: {
                role_id: {
                    equals: "36a664f4-3f50-4575-b96b-c4f74b91f5ce"
                }
            },
            orderBy: {
                id: "asc"
            }
        })

        const results: any[] = []
        data.forEach((value: any) => {
            results.push({
                value: value.id,
                label: value.name
            })
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

    async uploadPicture({ picture, id }: Upload) {
        if (!picture) {
            throw new Error("Foto não encontrada")
        }

        if (!id) {
            throw new Error("Usuário não encontrado")
        }

        const user = await prismaClient.user.update({
            data: {
                picture
            },
            where: {
                id,
            },
            select: {
                picture: true,
                name: true
            }
        })

        return {
            picture: user.picture,
            message: `Parabéns ${user.name}, sua foto foi atualizada com sucesso!`
        }
    }
}

export default UserService
export default interface IUser {
    id: string
    name: string 
    cpf: string
    telephone: string
    email: string 
    created_at?: Date | string
    picture?: string
}
export default interface IBudget {
    id: string
    value: string | number
    description: string
    vehicle: string
    created_at: Date | string
}
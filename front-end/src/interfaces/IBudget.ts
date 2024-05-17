export default interface IBudget {
    id: string
    value: string | number
    description: string
    vehicle: {
        name: string
    }
    status: string
    created_at: Date | string
}
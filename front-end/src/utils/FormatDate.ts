import dayjs from "dayjs"

export const formatDate = (value: Date | string | undefined) => {
    return dayjs(value).format("DD/MM/YYYY HH:mm")
}
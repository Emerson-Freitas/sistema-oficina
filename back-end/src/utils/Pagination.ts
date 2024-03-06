interface IPagination {
    page: number,
    limit: number,
    total: number
}

const generatePages = (page: number, totalPages: number) => {

}

export const pagination = ({ page, limit, total }: IPagination) => {
    const totalPages = Math.ceil(total / limit)
    const pages = generatePages(page, totalPages)
    const isCurrentPage = (n: number) => n === page; 
    return {
    }
};
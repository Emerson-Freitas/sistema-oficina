import { useState } from 'react'
import { Pagination as RSuitePagination } from 'rsuite';

interface Props {
    totalPages: number
    totalCount: number
}

const Pagination = ({ totalPages, totalCount }: Props) => {
    const [activePage, setActivePage] = useState(1);

    return (
        <RSuitePagination
            prev
            last
            next
            first
            size="md"
            total={totalCount}
            limit={totalPages}
            activePage={activePage}
            onChangePage={setActivePage}
        />
    )
}

export default Pagination
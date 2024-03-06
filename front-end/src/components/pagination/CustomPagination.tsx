import React from 'react'
import { Pagination } from 'rsuite'

interface Props {
    totalPages: number;
    activePage: () => number;
    onSelectPage: () => void;
}

const CustomPagination = ({totalPages, activePage, onSelectPage, totalCount}: any) => {
    return (
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          size="xs"
          maxButtons={10}
          limitOptions={[10, 30, 50]}
          total={totalCount}
          activePage={activePage}
          pages={totalPages}
          onSelect={onSelectPage}
        />
      );
}

export default CustomPagination
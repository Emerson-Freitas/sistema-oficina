import { Pagination } from 'rsuite'

interface Props {
    totalPages: number;
    activePage: number
    onSelectPage: (page: number) => void;
    totalCount: number
}

const CustomPagination = ({totalPages, activePage, onSelectPage, totalCount}: Props) => {
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
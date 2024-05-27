import { Col, Loader, Row } from 'rsuite'
import { IVehicle } from '../../pages/services/Service'
import CardVehicle from '../card/vehicles/CardVehicle'
import styles from './SectionVehicle.module.css'
import CustomPagination from '../pagination/CustomPagination'
import { useEffect, useState } from 'react'

interface Props {
    data: IVehicle[]
    find: (page: number, take: number) => void
    countLimit: number
    total: number
}

const SectionVehicle = ({ data, find, countLimit, total }: Props) => {
    const [activePage, setActivePage] = useState<number>(1);
    const limit: number = 6
    const [activeLoading, setActiveLoading] = useState<boolean>(true)

    const handlePageChange = (page: number) => {
        setActivePage(page)
        find(page, limit)
    }

    useEffect(() => {
        if (data.length === 0) {
            setActiveLoading(true)
        } else {
            setActiveLoading(false)
        }
    }, [data])

    return (
        <div>
            {activeLoading && (
                <Row className={styles.loader}>
                    <Loader size="lg"/>
                </Row>
            )}
            <Row>
                {data.map((vehicle: IVehicle) => (
                    <Col lg={8} md={12} sm={24} xs={24} key={vehicle.id}>
                    <CardVehicle
                        key={vehicle.id}
                        id={vehicle.id}
                        name={vehicle.name}
                        color={vehicle.color}
                        plate={vehicle.plate}
                        created_at={vehicle.created_at}
                        type={vehicle.type}
                    />
                    </Col>
                ))}
            </Row>
            <div className={styles.pagination}>
                <CustomPagination
                    totalPages={total}
                    activePage={activePage}
                    onSelectPage={handlePageChange}
                    totalCount={countLimit}
                />
            </div>
        </div>
    );
}

export default SectionVehicle
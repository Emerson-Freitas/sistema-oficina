import { Col, Loader, Row } from 'rsuite'
import { IVehicle } from '../../pages/services/Service'
import CardVehicle from '../card/vehicles/CardVehicle'

interface Props {
    data: IVehicle[]
    loading: boolean
}

const SectionVehicle = ({ data, loading }: Props) => {
    return (
        <Row>
            {loading && 
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <Loader size='lg' />
                </div>
            }
            {data.map((vehicle: IVehicle) => (
                <Col lg={8} md={12} sm={24} xs={24} key={vehicle.id}>
                <CardVehicle
                    key={vehicle.id}
                    name={vehicle.name}
                    color={vehicle.color}
                    plate={vehicle.plate}
                    created_at={vehicle.created_at}
                    type={vehicle.type}
                />
                </Col>
            ))}
        </Row>
    );
}

export default SectionVehicle
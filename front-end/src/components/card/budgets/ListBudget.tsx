import { PanelGroup, Panel, Row, Col } from "rsuite";
import { formatDate } from "../../../utils/FormatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faMotorcycle, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";

interface IVehicle {
  id: string
  name: string
  type: string
}

interface IBudget {
  id: string
  description: string
  user_id: string
  value: string | number
  vehicle: IVehicle
  status: string
  created_at: Date | undefined
}

interface Props {
  budgets: IBudget[]
  totalPages: number
  totalCount: number
}

const ListBudget = ({ budgets, totalPages, totalCount }: Props) => {

  const [activeKey, setActiveKey] = useState<any>(null);

  const handlePanelToggle = (key: any) => {
    setActiveKey(key);
  };

  return (
    <>
      <PanelGroup accordion bordered activeKey={activeKey} onSelect={handlePanelToggle}>
        {budgets.map((budget: IBudget, index: number) => (
          <Panel key={index} header={`Data de Criação: ${formatDate(budget?.created_at)}`} eventKey={index}>
            <Row>
              <Col md={2}>
                {budget.vehicle.type === "Carro" && <FontAwesomeIcon icon={faCar} size="2x" style={{ padding: "30px 24px" }}/>}
                {budget.vehicle.type === "Moto" && <FontAwesomeIcon icon={faMotorcycle} size="2x" style={{ padding: "30px 24px" }} />}
                {budget.vehicle.type === "Caminhão" && <FontAwesomeIcon icon={faTruck} size="2x" style={{ padding: "30px 24px" }} />}
              </Col>
              <Col md={8} style={{ fontSize: 16 }}>
                <p><strong>Nome do veículo:</strong> {budget.vehicle.name}</p>
                <p><strong>Descrição do Orçamento:</strong> {budget.description}</p>
                <p><strong>Status do Orçamento:</strong> {budget.status}</p>
              </Col>
            </Row>
          </Panel>
        ))}
      </PanelGroup>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "50px 0" }}>
        <Pagination
          totalPages={totalPages}
          totalCount={totalCount}
        />
      </div>
    </>
    );
};

export default ListBudget;

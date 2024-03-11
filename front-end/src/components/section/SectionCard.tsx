import React, { useState } from "react";
import styles from "./SectionCard.module.css";
import { Col, Loader, Panel, Placeholder, Row } from "rsuite";
import CardBudget from "../card/budgets/CardBudget";
import CustomPagination from "../pagination/CustomPagination";
import IBudget from "../../interfaces/IBudget";

interface Props {
  loading: boolean;
  data: IBudget[];
  find: (page:number, take: number) => void;
  countLimit: number;
  total: number;
}

const SectionCard = ({ data, loading, find, countLimit, total }: Props) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    find(page, limit)
  };
  
  return (
    <>
      <Row>
        {data?.map((item: IBudget) => (
          <Col md={8} sm={24} xs={24}>
            <CardBudget
              key={item.id}
              value={item.value}
              description={item.description}
              created_at={item.created_at}
              vehicle={item.vehicle.name}
              id={item.id}
            />
          </Col>
        ))}
      </Row>
      <div style={{ width: "100%", padding: "20px 0 20px 0"}}>
        <CustomPagination
          totalPages={total}
          activePage={activePage}
          onSelectPage={handlePageChange}
          totalCount={countLimit}
        />
      </div>
    </>
  );
};

export default SectionCard;

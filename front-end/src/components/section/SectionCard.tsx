import React, { useEffect, useState } from "react";
import styles from "./SectionCard.module.css";
import { Col, Loader, Panel, Placeholder, Row } from "rsuite";
import CardBudget from "../card/budgets/CardBudget";
import CustomPagination from "../pagination/CustomPagination";
import IBudget from "../../interfaces/IBudget";

interface Props {
  data: IBudget[];
  find: (page:number, take: number, queryInput: string) => void;
  countLimit: number;
  total: number;
  queryInput: string;
}

const SectionCard = ({ data, find, countLimit, total, queryInput }: Props) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  const [activeLoading, setActiveLoading] = useState<boolean>(true)

  const handlePageChange = (page: number) => {
    setActivePage(page);
    find(page, limit, queryInput)
  };

  useEffect(() => {
    if (data.length === 0) {
      setActiveLoading(true);
    } else {
      setActiveLoading(false);
    }
  }, [data]);

  return (
    <>
      {activeLoading ? (
        <Row style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader size="md"/>
        </Row>
      ) : (
        <>
          <Row>
            {data?.map((item: IBudget) => (
              <Col md={8} sm={24} xs={24} key={item.id}>
                <CardBudget
                  key={item.id}
                  value={item.value}
                  description={item.description}
                  created_at={item.created_at}
                  vehicle={item.vehicle.name}
                  status={item.status}
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
      )}
    </>
  );
};

export default SectionCard;

import dayjs from "dayjs";
import { Input, InputNumber, Panel, Tooltip, Whisper } from "rsuite";
import styles from "./CardBudget.module.css";
import {
  faCalculator,
  faPenToSquare,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../hooks/useAuth";
import React, { useState } from "react";
import CustomWhisper from "../../whisper/CustomWhisper";
import UpdateModal from "../../modal/updateModal/UpdateModal";
import IUpdateBudget from "../../../interfaces/IUpdateBudget";
import stylesModal from "../../modal/Modal.module.css";
import { formatDate } from "../../../utils/FormatDate";
import { currencyFormat } from "../../../utils/FormatCurrency";
import { ROLE } from "../../../enum/Role";

interface Props {
  id: string;
  value: string | number;
  description: string;
  vehicle: string;
  created_at: string | Date;
}

const CardBudget = ({ value, description, vehicle, created_at, id }: Props) => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleClose = () => setOpenModal(false);
  const [data, setData] = useState<IUpdateBudget>({
    id: "",
    value: "",
    description: "",
    vehicle: "",
  });
  const handleChangeModal = () => {
    setOpenModal(!openModal);
  };

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | number;
  }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div style={{ marginTop: "1.5%" }}>
      <div className={styles.contentActions}>
        {user?.role.name === ROLE.ADMIN || user?.role.name === ROLE.FUNCIONARIO ? (
          <>
            {openModal && (
              <UpdateModal
                data={data}
                open={openModal}
                handleClose={handleClose}
                table="budgets"
                title={`Editando o Orçamento: ${description}`}
              >
                <div>
                  <Input
                    name="vehicle"
                    value={data.vehicle}
                    type="text"
                    placeholder="Veículo"
                    className={stylesModal.input}
                    onChange={(
                      value: string,
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => handleChange({ name: event.target.name, value })}
                  />
                  <Input
                    name="description"
                    value={data.description}
                    type="text"
                    className={stylesModal.input}
                    placeholder="Descrição"
                    onChange={(
                      value: string,
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => handleChange({ name: event.target.name, value })}
                  />
                  <InputNumber
                    name="value"
                    type="number"
                    prefix="R$"
                    placeholder="Valor"
                    min={0}
                    onChange={(value: string | number) =>
                      handleChange({ name: "value", value })
                    }
                    value={data.value}
                    style={{
                      height: 42,
                      marginBottom: 10,
                    }}
                  />
                </div>
              </UpdateModal>
            )}
            <CustomWhisper
              content={
                <FontAwesomeIcon
                  className={styles.actions}
                  icon={faPenToSquare}
                  color="white"
                  size="lg"
                  onClick={() => {
                    setData({
                      id: id,
                      value: value,
                      description: description,
                      vehicle: vehicle,
                    });
                    handleChangeModal();
                  }}
                />
              }
              controlId="control-id-hover"
              message="Editar Orçamento"
              trigger="hover"
              placement="top"
            ></CustomWhisper>
            <CustomWhisper
              content={
                <FontAwesomeIcon
                  icon={faCheck}
                  color="white"
                  size="lg"
                  className={styles.actions}
                />
              }
              controlId="control-id-hover"
              message="Aceitar Orçamento"
              trigger="hover"
              placement="top"
            ></CustomWhisper>
            <CustomWhisper
              content={
                <FontAwesomeIcon
                  icon={faXmark}
                  color="white"
                  size="lg"
                  className={styles.actions}
                />
              }
              controlId="control-id-hover"
              message="Rejeitar Orçamento"
              trigger="hover"
              placement="top"
            ></CustomWhisper>
          </>
        ) : (
          <CustomWhisper
            content={
              <FontAwesomeIcon
                icon={faXmark}
                color="white"
                size="lg"
                className={styles.actions}
              />
            }
            controlId="control-id-hover"
            message="Rejeitar Orçamento"
            trigger="hover"
            placement="top"
          ></CustomWhisper>
        )}
      </div>
      <Panel bordered className={styles.panel}>
        <div className={styles.contentPicture}>
          <FontAwesomeIcon
            icon={faCalculator}
            className={styles.faCalculator}
          />
          <div className={styles.content}>
            <span className={styles.value}>Veículo: {vehicle}</span>
            <span className={styles.value}>Descrição: {description}</span>
            <span className={styles.value}>Valor: {currencyFormat(value)}</span>
            <span className={styles.value}>
              Criado em: {formatDate(created_at)}
            </span>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default CardBudget;

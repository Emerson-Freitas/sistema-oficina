import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../utils/FormatDate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faMotorcycle, faTruck } from "@fortawesome/free-solid-svg-icons";
import stylesDarkMode from './CardVehicleDarkMode.module.css';
import stylesLightMode from './CardVehicleLightMode.module.css';
import { useTheme } from '../../hooks/useTheme';
import {
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import CustomWhisper from '../../whisper/CustomWhisper';
import UpdateModal from '../../modal/updateModal/UpdateModal';
import { Input, SelectPicker, TagPicker } from 'rsuite';
import stylesModal from '../../modal/Modal.module.css';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import DeleteModal from '../../modal/deleteModal/DeleteModal';
import CustomTagPicker from '../../tag-picker/CustomTagPicker';

interface Props {
  id: string;
  name: string;
  plate: string;
  color: string;
  type: string;
  created_at: Date | string;
}

export interface IVehicleUpdate {
  id: string;
  name: string;
  color: string;
  type: string;
  plate: string;
}

const vehicleTypes = ['Carro', 'Moto', 'Caminhão'].map(
  item => ({ label: item, value: item })
);

type Budget = {
  label: string;
  value: string;
};

const CardVehicle = ({ id, name, plate, color, type, created_at }: Props) => {
  const { theme } = useTheme();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const handleCloseModalEdit = () => setOpenModalEdit(false);
  const handleCloseModalDelete = () => setOpenModalDelete(false);
  const [vehicleType, setVehicleType] = useState<string>(type);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [defaultBudgets, setDefaultBudgets] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  const [data, setData] = useState<IVehicleUpdate>({
    id: "",
    color: "",
    plate: "",
    name: "",
    type: ""
  });

  const handleUpdate = () => {
    setData({
      id: id,
      name: name,
      plate: plate,
      color: color,
      type: type
    });
    handleOpenModalEdit();
  };

  const handleOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

  const handleChange = ({name, value}: {name: string, value: string | number}) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (openModalDelete) {
      findBudgetsByVehicle();
    }
  }, [openModalDelete]);

  const findBudgetsByVehicle = async () => {
    setLoading(true);
    try {
      const res: AxiosResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/budgets/vehicle/${id}`, { headers: { Authorization: token }});
      const defaultBudgets = res.data.map((budget: Budget) => budget.value);
      setBudgets(res.data);
      setDefaultBudgets(defaultBudgets);
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme === "light" ? stylesLightMode.container : stylesDarkMode.container}>
      <div className={stylesLightMode.logoContent}>
        {type === "Carro" && <FontAwesomeIcon icon={faCar} size="2x" className={stylesLightMode.logo} />}
        {type === "Moto" && <FontAwesomeIcon icon={faMotorcycle} size="2x" className={stylesLightMode.logo} />}
        {type === "Caminhão" && <FontAwesomeIcon icon={faTruck} size="2x" className={stylesLightMode.logo} />}
      </div>
      <div className={stylesLightMode.content}>
        <div className={stylesLightMode.containerIcons}>
          <CustomWhisper
            content={
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                className={theme === "light" ? stylesLightMode.actions : stylesDarkMode.actions}
                onClick={handleUpdate}
              />
            }
            controlId="control-id-hover"
            message="Editar Veículo"
            trigger="hover"
            placement="top"
          />
          <CustomWhisper
            content={
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                className={theme === "light" ? stylesLightMode.actions : stylesDarkMode.actions}
                onClick={handleOpenModalDelete}
              />
            }
            controlId="control-id-hover"
            message="Excluir Veículo"
            trigger="hover"
            placement="top"
          />
        </div>
        <p>
          Nome: <strong>{name}</strong>
        </p>
        <p>
          Placa: <strong>{plate}</strong>
        </p>
        <p>
          Cor: <strong>{color}</strong>
        </p>
        <p>
          Tipo: <strong>{type}</strong>
        </p>
        <p>
          Data de Criação: <strong>{formatDate(created_at)}</strong>
        </p>
      </div>
      {openModalEdit && (
        <UpdateModal
          data={data}
          open={openModalEdit}
          handleClose={handleCloseModalEdit}
          table="vehicles"
          title={`Editando o Veículo: ${name}`}
        >
          <div>
            <Input
              name="name"
              value={data.name}
              type="text"
              placeholder="Nome do Veículo"
              className={stylesModal.input}
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
            <Input
              name="plate"
              value={data.plate}
              type="text"
              className={stylesModal.input}
              placeholder="Placa"
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
            <Input
              name="color"
              value={data.color}
              type="text"
              className={stylesModal.input}
              placeholder="Cor"
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
            <SelectPicker
              label={"Tipo do Veículo"}
              data={vehicleTypes}
              style={{ width: "100%" }}
              onChange={(event) => {
                setVehicleType(event ? event : "");
              }}
              value={vehicleType}
            />
          </div>
        </UpdateModal>
      )}
      {openModalDelete && (
        <DeleteModal
          id={id}
          handleClose={handleCloseModalDelete}
          handleOpen={handleOpenModalDelete}
          name={name}
          open={openModalDelete}
          table={"vehicles"}
          children={
            <>
              {loading && (
                <label style={{ width: "100%", fontWeight: "bolder", display: 'inline-block', padding: "0 5px 10px 5px" }}>
                  Carregando orçamentos...
                </label>
              )}
              {budgets.length > 0 && defaultBudgets.length > 0 ? (
                <CustomTagPicker
                  title='ORÇAMENTOS VINCULADOS Á ESSE VEÍCULO'
                  handleChange={setDefaultBudgets}
                  data={budgets}
                  defaultData={defaultBudgets}
                />
              ) : (
                <label style={{ width: "100%", fontWeight: "bolder",  display: 'inline-block', padding: "0 5px 10px 5px" }}>
                  NÃO HÁ NENHUM ORÇAMENTO VINCULADO Á ESSE VEÍCULO
                </label>
              )}
            </>
          }
        />
      )}
    </div>
  );
}

export default CardVehicle;

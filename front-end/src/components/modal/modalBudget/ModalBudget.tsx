import {
  Button,
  ButtonToolbar,
  IconButton,
  Input,
  InputGroup,
  InputNumber,
  SelectPicker,
} from "rsuite";
import { Modal as ModalRSuite } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import styles from "../Modal.module.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import SearchIcon from "@rsuite/icons/Search";
import { ROLE } from "../../../enum/Role";
import CloseIcon from '@rsuite/icons/Close';

interface Props {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
  handleQueryInput: (event: string) => void;
  handleCallQueryInput: () => void;
  queryInput: string
}

interface RSuiteComponent {
  value: string;
  label: string;
}

const ModalBudget = ({
  handleOpen,
  handleClose,
  open,
  handleQueryInput,
  handleCallQueryInput,
  queryInput
}: Props) => {
  const [clients, setClients] = useState<RSuiteComponent[]>([]);
  const [selectedClient, setSelectedClient] = useState<unknown | string>();
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user, token } = useAuth();
  const [vehicles, setVehicles] = useState<RSuiteComponent[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<unknown | string>();
  const [includesValueInput, setIncludesValueInput] = useState<boolean>();

  const handleSubmit = async () => {
    setLoading(true);
    if (user?.role.name !== ROLE.CLIENTE && !value) {
      toast.warning("Por favor preencha todos os campos!");
    } else {
      if (description && selectedClient && selectedVehicle) {
        await axios
          .post(
            `${import.meta.env.VITE_BASE_URL}/budgets`,
            { value, description, selectedClient },
            { headers: { Authorization: token } }
          )
          .then((res: AxiosResponse) => {
            setValue(0);
            setDescription("");
            toast.success(`${res.data.message}`);
          })
          .catch((error: Error) => {
            toast.error(`${error.response.data.message}`);
          })
          .finally(() => {
            setLoading(false);
            handleClose();
          });
      } else {
        setLoading(false);
        toast.warning("Por favor preencha todos os campos!");
      }
    }
  };

  const findClients = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/clients`, {
        headers: { Authorization: token },
      })
      .then((res: AxiosResponse) => {
        setClients(res.data);
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
      });
  };

  const findVehiclesAdmin = async (id: unknown) => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/vehicles/${id}`,{
        headers: { Authorization: token },
      })
      .then((res: AxiosResponse) => {
        setVehicles(res.data);
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
      });
  };

  const findVehiclesClient = async () => {
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/client/vehicles`, { user_id: user?.id }, {
        headers: { Authorization: token },
      })
      .then((res: AxiosResponse) => {
        setVehicles(res.data);
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    if (selectedClient) {
      findVehiclesAdmin(selectedClient)
    }
  }, [selectedClient])

  useEffect(() => {
    if (user?.role.name === ROLE.ADMIN || user?.role.name === ROLE.FUNCIONARIO) {
      findClients();
    }
    if (user?.role.name === "CLIENTE") {
      findVehiclesClient();
      setSelectedClient(user.id);
    }
  }, [user]);

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      handleCallQueryInput();
    }
  };

  const handleEmptyInput = () => {
    setIncludesValueInput(false);
  }

  useEffect(() => {
    if (!queryInput && includesValueInput) {
      handleEmptyInput()
    }
  }, [queryInput, includesValueInput]) 

  return (
    <div>
      <ButtonToolbar>
        <Button
          style={{ backgroundColor: "#282F66", color: "white" }}
          onClick={handleOpen}
        >
          Novo Orçamento
        </Button>
        <InputGroup inside style={{ width: "30%" }}>
          <Input
            maxLength={100}
            onChange={(event) => {
              handleQueryInput(event)
              setIncludesValueInput(true)
            }}
            placeholder="Digite o que deseja filtrar..."
            onKeyDown={handleKeyPress}
            value={queryInput}
          />
          <InputGroup.Button onClick={handleCallQueryInput}>
            {includesValueInput && (
              <CloseIcon
                style={{  marginRight: "20px" }}
                onClick={() => {
                  handleEmptyInput()
                  handleQueryInput("");
                }}
              />
            )}
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
      </ButtonToolbar>
      <ModalRSuite
        open={open}
        onClose={handleClose}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <ModalRSuite.Header>
          <ModalRSuite.Title
            style={{ fontWeight: "bold", marginLeft: "1%", marginTop: "2%" }}
          >
            Cadastro de Orçamentos
          </ModalRSuite.Title>
        </ModalRSuite.Header>
        <ModalRSuite.Body>
          <Input
            type="text"
            onChange={(event) => setDescription(event)}
            value={description}
            placeholder="Descrição"
            className={styles.input}
          />
          {user?.role.name === "ADMIN" && (
            <>
              <InputNumber
                type="number"
                prefix="R$"
                placeholder="Valor"
                min={0}
                onChange={(value) => setValue(Number(value))}
                value={value}
                style={{
                  height: 42,
                  marginBottom: 10,
                }}
              />
              <SelectPicker
                label={"Usuário"}
                data={clients}
                style={{ width: "100%" }}
                onChange={(event) => {
                  setSelectedClient(event);
                }}
                value={selectedClient}
              />
            </>
          )}
          <SelectPicker
            label={"Veículo"}
            data={vehicles}
            style={{ width: "100%", margin: '10px 0' }}
            onChange={(event) => {
              setSelectedVehicle(event);
            }}
            value={selectedVehicle}
          />
        </ModalRSuite.Body>
        <ModalRSuite.Footer>
          <Button
            onClick={handleSubmit}
            appearance="primary"
            loading={loading}
            color="green"
          >
            SALVAR
          </Button>
          <Button onClick={handleClose} appearance="primary" color="red">
            CANCELAR
          </Button>
        </ModalRSuite.Footer>
      </ModalRSuite>
    </div>
  );
};

export default ModalBudget;

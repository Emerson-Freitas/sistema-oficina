import { Button, ButtonToolbar, Input, InputGroup } from "rsuite";
import { Modal as ModalRSuite } from "rsuite";
import { SelectPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import "rsuite/dist/rsuite.min.css";
import styles from "../Modal.module.css";
import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { MaskCPF } from "../../../utils/MaskCPF";
import { MaskTelephone } from "../../../utils/MaskTelephone";
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { AuthContext } from "../../../contexts/AuthContext";

interface Props {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
}

interface User {
  name: string;
  email: string;
  password: string;
  telephone: string;
  cpf: string;
  role_id: string;
}

interface Role {
  id: string 
  name: string
}

const ModalUser = ({ handleOpen, handleClose, open }: Props) => {
  const [data, setData] = useState<User>({
    name: "",
    cpf: "",
    email: "",
    password: "",
    telephone: "",
    role_id: ""
  });
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<Role[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [visible, setVisible] = useState(false)
  const { token } = useContext(AuthContext)

  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const updateData = () => {
    if (items.length === 0) {
      setItems(roles);
    }
  };

  const renderMenu = (menu: any) => {
    if (items.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <SpinnerIcon spin /> Loading...
        </p>
      );
    }
    return menu;
  };

  const handleSubmit = async () => {
    setLoading(true)

    if (!data.name || !data.cpf || !data.telephone || !data.role_id) {
      toast.warning("Por favor, preencha todos os campos", {
        pauseOnFocusLoss: true,
        autoClose: 2500
      });

      setLoading(false)
      return 
    }

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/users`, 
      data,
      { 
        headers: {
          'Authorization': token 
        }
      }
      )
      .then((res: AxiosResponse) => {
        toast.success(`${res.data.message}`);
        handleClose()
        setLoading(false)
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
        setLoading(false)
      })
  };

  useEffect(() => {
    if (!open) {
      setData({
        name: "",
        cpf: "",
        email: "",
        telephone: "",
        role_id: "",
        password: ""
      });
    }
  }, [open]);

  useEffect(() => {
    const findRoles = async () => {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/roles`)
        .then((res: AxiosResponse) => {
          const roles = res.data.map(
            (item: Role) => ({ label: item.name === 'FUNCIONARIO' ? "FUNCIONÁRIO" : item.name, value: item.id})
          );
          setRoles(roles)
        })
        .catch((error: Error) => {
          console.log('Erro ao buscar as roles', error.message)
          setRoles([])
        })
    }
    findRoles()
  }, []);

  return (
    <div>
      <ButtonToolbar>
        <Button
          style={{ backgroundColor: "#282F66", color: "white" }}
          onClick={handleOpen}
        >
          Novo Usuário
        </Button>
      </ButtonToolbar>
      <ModalRSuite
        open={open}
        onClose={handleClose}
        style={{ marginTop: "10px", marginBottom: "10px", top: "2.6%" }}
      >
        <ModalRSuite.Header>
          <ModalRSuite.Title
            style={{ fontWeight: "bold", marginLeft: "1%", marginTop: "2%" }}
          >
            Cadastro de Usuário
          </ModalRSuite.Title>
        </ModalRSuite.Header>
        <ModalRSuite.Body>
          <Input
            type="text"
            name="name"
            value={data.name}
            placeholder="Nome completo"
            className={styles.input}
            onChange={(
              value: string,
              event: React.ChangeEvent<HTMLInputElement>
            ) => handleChange({ name: event.target.name, value })}
          />
          <Input
            type="text"
            name="cpf"
            value={MaskCPF(data.cpf)}
            placeholder="CPF"
            className={styles.input}
            onChange={(
              value: string,
              event: React.ChangeEvent<HTMLInputElement>
            ) => handleChange({ name: event.target.name, value })}
          />
          <Input
            type="text"
            name="telephone"
            maxLength={15}
            value={MaskTelephone(data.telephone)}
            placeholder="Telefone"
            className={styles.input}
            onChange={(
              value: string,
              event: React.ChangeEvent<HTMLInputElement>
            ) => handleChange({ name: event.target.name, value })}
          />
          <Input
            type="text"
            name="email"
            value={data.email}
            placeholder="Email"
            className={styles.input}
            onChange={(
              value: string,
              event: React.ChangeEvent<HTMLInputElement>
            ) => handleChange({ name: event.target.name, value })}
          />
          <InputGroup style={{ display: "flex", marginBottom: "10px"}}>
            <Input
              type={visible ? 'text' : 'password'}
              name="password"
              value={data.password}
              style={{ padding: "14px" }}
              placeholder="Senha"
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
            <InputGroup.Button onClick={handleVisible} style={{ display: "center", alignItems: "center"}}>
                {visible ? <EyeIcon/> : <EyeSlashIcon/>}
            </InputGroup.Button>
          </InputGroup>
          <SelectPicker
            placeholder={"Função do Usuário"}
            data={roles}
            style={{ width: "100%" }}
            onOpen={updateData}
            onSearch={updateData}
            renderMenu={renderMenu}
            onChange={(value: string) => {
              handleChange({ name: "role_id", value})
            }}
            value={data.role_id}
          />
        </ModalRSuite.Body>
        <ModalRSuite.Footer>
          <Button onClick={handleSubmit} appearance="primary" loading={loading} color="green">
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

export default ModalUser;

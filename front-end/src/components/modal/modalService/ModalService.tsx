import { Button, ButtonToolbar, Input, SelectPicker } from 'rsuite';
import { Modal as ModalRSuite } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from '../Modal.module.css'
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface Props {
    handleClose: () => void
    handleOpen: () => void
    open: boolean
}

interface RSuiteComponent {
  value: string,
  label: string
}

const ModalService = ({ handleOpen, handleClose, open }: Props) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [clients, setClients] = useState<RSuiteComponent[]>([])
  const [name, setName] = useState<string>("")
  const [plate, setPlate] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [userId, setUserId] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    if (name && plate && color && userId) {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/vehicles`, { name, color, plate, userId })
        .then((res: AxiosResponse) => {
          setName("")
          setColor("")
          setPlate("")
          setUserId(null)
          toast.success(`${res.data.message}`)
        })
        .catch((error: Error) => {
          toast.error(`${error.response.data.message}`);
        })
        .finally(() => {
          setLoading(false)
          handleClose()
        })
    } else {
      setLoading(false)
      toast.warning("Por favor preencha todos os campos!")
    }
  }

  useEffect(() => {
    const findClients = async () => {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/clients`)
        .then((res: AxiosResponse) => {
          console.log('res.data:::', res.data)
          setClients(res.data)
        })
        .catch((error: Error) => {
          console.log(`${error.response.data.message}`);
        })
    }
    findClients()
  }, [])

  return (
    <div>
      <ButtonToolbar>
        <Button style={{ backgroundColor: "#282F66", color: 'white'}} onClick={handleOpen}>Novo Veículo</Button>
      </ButtonToolbar>
      <ModalRSuite open={open} onClose={handleClose} style={{ marginTop: 10, marginBottom: 10 }}>
        <ModalRSuite.Header>
          <ModalRSuite.Title style={{ fontWeight: 'bold', marginLeft: "1%", marginTop: "2%"}}>Cadastro de Veículo</ModalRSuite.Title>
        </ModalRSuite.Header>
        <ModalRSuite.Body>
          <Input type='text' placeholder="Nome do Veículo" className={styles.input} value={name} onChange={(event) => setName(event)}/>
          <Input type='text' placeholder="Placa" className={styles.input} value={plate} onChange={(event) => setPlate(event)}/>
          <Input type='text' placeholder="Cor" className={styles.input} value={color} onChange={(event) => setColor(event)}/>
          <SelectPicker
            label={"Usuário"}
            data={clients}
            style={{ width: "100%"}}
            onChange={(event) => setUserId(event)}
            value={userId}
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

export default ModalService;

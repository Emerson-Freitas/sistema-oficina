import { Button, ButtonToolbar, Input, InputNumber, SelectPicker } from 'rsuite';
import { Modal as ModalRSuite } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from '../Modal.module.css'
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { eventNames } from 'process';
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

const ModalBudget = ({ handleOpen, handleClose, open }: Props) => {

  const [clients, setClients] = useState<RSuiteComponent[]>([])
  const [selectedClient, setSelectedClient] = useState<unknown>()
  const [value, setValue] = useState<number>(0)
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)
    if (value && description && selectedClient) {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/budgets`, { value, description, selectedClient })
        .then((res: AxiosResponse) => {
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
        <Button style={{ backgroundColor: "#282F66", color: 'white'}} onClick={handleOpen}>Novo Orçamento</Button>
      </ButtonToolbar>
      <ModalRSuite open={open} onClose={handleClose} style={{ marginTop: 10, marginBottom: 10 }}>
        <ModalRSuite.Header>
          <ModalRSuite.Title style={{ fontWeight: 'bold', marginLeft: "1%", marginTop: "2%"}}>Cadastro de Orçamentos</ModalRSuite.Title>
        </ModalRSuite.Header>
        <ModalRSuite.Body>
          <Input 
            type='text' 
            onChange={(event) => setDescription(event)}
            value={description}
            placeholder="Descrição" 
            className={styles.input}
          />
          <InputNumber
            type='number'
            prefix='R$'
            placeholder="Valor"
            min={0}
            onChange={(value) => setValue(Number(value))}
            value={value}
            style={{
              height: 42,
              marginBottom: 10
            }}
          />
          <SelectPicker
            label={"Usuário"}
            data={clients}
            style={{ width: "100%"}}
            onChange={(event) => {setSelectedClient(event)}}
            value={selectedClient}
          />
        </ModalRSuite.Body>
        <ModalRSuite.Footer>
          <Button onClick={handleSubmit} loading={loading} appearance="primary">
            Salvar
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancelar
          </Button>
        </ModalRSuite.Footer>
      </ModalRSuite>
    </div>
  );
};

export default ModalBudget;

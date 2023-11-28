import { Button, ButtonToolbar, Input } from 'rsuite';
import { Modal as ModalRSuite } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from '../Modal.module.css'

interface Props {
    handleClose: () => void
    handleOpen: () => void
    open: boolean
}

const ModalService = ({ handleOpen, handleClose, open }: Props) => {
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
          <Input type='text' placeholder="Nome do Veículo" className={styles.input}/>
          <Input type='text' placeholder="Placa" className={styles.input}/>
          <Input type='text' placeholder="Cor" className={styles.input}/>
        </ModalRSuite.Body>
        <ModalRSuite.Footer>
          <Button onClick={handleClose} appearance="primary">
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

export default ModalService;

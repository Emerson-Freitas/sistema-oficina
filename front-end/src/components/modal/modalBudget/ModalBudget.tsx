import { Button, ButtonToolbar, Input, SelectPicker } from 'rsuite';
import { Modal as ModalRSuite } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from '../Modal.module.css'
import { useState } from 'react';

interface Props {
    handleClose: () => void
    handleOpen: () => void
    open: boolean
}

const ModalBudget = ({ handleOpen, handleClose, open }: Props) => {

  const data: any = ['Emerson', 'Jefferson', 'Paulo'].map(
    item => ({ label: item, value: item })
  );

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
          <Input type='text' placeholder="Descrição" className={styles.input}/>
          <Input type='number' placeholder="Valor" className={styles.input}/>
          <SelectPicker
            label={"User"}
            data={data}
            style={{ width: "100%"}}
          />
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

export default ModalBudget;

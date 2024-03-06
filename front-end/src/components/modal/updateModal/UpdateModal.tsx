import { ReactNode, useState } from "react";
import { Button, Modal } from "rsuite";
import IUser from "../../../interfaces/IUser";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";

interface Props {
  data: IUser;
  table: string;
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const UpdateModal = ({ data, table, handleClose, open, children }: Props) => {
  const [userName] = useState<string>(data.name);
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)

    for(const key in data) {
      const value: any = data[key];
      if(!value) {
        toast.warning(`Por favor, preencha o campo ${key}`)
      }
    }

    await axios.put(`${import.meta.env.VITE_BASE_URL}/${table}/${data.id}`, data)
      .then((res: AxiosResponse) => {
        toast.success(`${res.data.message}`)
        handleClose()
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{ marginTop: "10px", marginBottom: "10px", top: "2.6%" }}
    >
      <Modal.Header>
        <Modal.Title style={{ marginLeft: "1%", marginTop: "2%" }}>
          Editando o Usuário: 
          <span style={{ fontWeight: "bold" }}> {userName}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} appearance="primary" color="green" loading={loading}>SALVAR</Button>
        <Button onClick={handleClose} appearance="primary" color="red">CANCELAR</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;

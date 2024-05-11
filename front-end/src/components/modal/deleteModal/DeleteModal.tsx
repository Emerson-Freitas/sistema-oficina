import { Button, Modal } from "rsuite";
import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  name: string;
  id: string;
  table: string
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const DeleteModal = ({ name, id, open, table, handleClose }: Props) => {
  const { token } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)

    await axios.delete(`${import.meta.env.VITE_BASE_URL}/${table}/${id}`, { headers: { Authorization: token }})
        .then((res: AxiosResponse) => {
            toast.success(`${res.data.message}`)
        })
        .catch((error: Error) => {
            toast.error(`${error.message}`)
        })
        .finally(() => {
            setLoading(false)
            handleClose()
        })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title
          style={{ fontWeight: "bold", marginLeft: "1%", marginTop: "2%" }}
        >
          <p>Deseja deletar o usuário: <span>{name}?</span></p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display: "flex", gap:10, marginTop: '30px'}}>
        <Button
            onClick={handleSubmit}
            appearance="primary"
            loading={loading}
            color="red"
          >
          <span>DELETAR</span>
        </Button>
        <Button onClick={handleClose} appearance="primary" color="green">
          <span>CANCELAR</span>
        </Button>
       
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;

import { Button, Modal } from "rsuite";
import React, { useState } from 'react'
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
  children?: React.ReactNode
}

const DeleteModal = ({ name, id, open, table, handleClose, children }: Props) => {
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
      <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 10, marginTop: '30px' }}>
        <div style={{ marginBottom: "10px", width: "100%" }}>
          {children}
        </div>
        <div style={{ display: "flex", gap: "2.5%", width: "100%" }}>
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
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;

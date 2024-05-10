import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "rsuite";

interface Props {
  id: string;
  route: string;
  open: boolean;
  title: string
  handleClose: () => void;
  handleOpen: () => void;
  token: string
}

const ActionsBudget = ({ id, route, open, handleClose, handleOpen, title, token }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true)

    await axios.put(`${import.meta.env.VITE_BASE_URL}/${route}/${id}`, {id: id }, { headers: { Authorization: token }})
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
        <Modal.Title style={{ fontWeight: "bold", marginLeft: "1%", marginTop: "2%" }}>
          <p><span>{title}</span></p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", gap: 10, marginTop: "30px" }}>
        <Button onClick={handleSubmit} appearance="primary" color="green" loading={loading}>
          <span>ACEITAR</span>
        </Button>
        <Button
          appearance="primary"
          color="red"
          onClick={() => handleClose()}
        >
          <span>CANCELAR</span>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ActionsBudget;

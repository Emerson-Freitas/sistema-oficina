import { useEffect, useState } from "react";
import CustomContent from "../../components/content/CustomContent";
import ModalService from "../../components/modal/modalService/ModalService";
import { useAuth } from "../../components/hooks/useAuth";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../../components/hooks/useTheme";
import SectionVehicle from "../../components/section/SectionVehicle";

export interface IVehicle {
  id: string;
  name: string;
  plate: string;
  color: string;
  user_id: string;
  type: string;
  created_at: Date | string;
}

const Service = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const { user, token } = useAuth()
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const { theme } = useTheme()
  const [loading, setLoading] = useState<boolean>(false)

  const findVehicles = async (id: string) => {
    if (id) {
      setLoading(true)
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/vehicles/${id}`, {
          headers: { Authorization: token },
        })
        .then((res: AxiosResponse) => {
          setVehicles(res.data);
        })
        .catch((error: Error) => {
          toast.error(`${error}`);
        })
        .finally(() => setLoading(false))
    }
  };

  useEffect(() => {
    if (user) {
      findVehicles(user.id)
    }
  }, [user])

  return (
    <CustomContent title={"Meus Veículos"}>
      <ModalService
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <SectionVehicle
        data={vehicles}
        loading={loading}
      />
    </CustomContent>
  );
};

export default Service;

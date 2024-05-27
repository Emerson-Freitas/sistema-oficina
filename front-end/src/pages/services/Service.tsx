import { useEffect, useState } from "react";
import CustomContent from "../../components/content/CustomContent";
import ModalService from "../../components/modal/modalService/ModalService";
import { useAuth } from "../../components/hooks/useAuth";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
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
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const page: number = 1;
  const initialTake: number = 6
  const [types, setTypes] = useState<any>([])

  const findVehicles = async (page: number, take: number = 6) => {
    const id = user?.id
    if (id) {
      const skip = (page - 1) * take 
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/vehicles/${id}?skip=${skip}&take=${take}`, {
          headers: { Authorization: token },
        })
        .then((res: AxiosResponse) => {
          setVehicles(res.data.vehicles);
          setTotal(res.data.totalPages);
          setLimit(res.data.count);
        })
        .catch((error: Error) => {
          toast.error(`${error}`);
        })
    }
  };

  // const findSelectTypesVehicles = async () => {
  //   await axios
  //     .get(`${import.meta.env.VITE_BASE_URL}/types`, {
  //       headers: { Authorization: token },
  //     })
  //     .then((res: AxiosResponse) => {
  //       setTypes(res.data);
  //     })
  //     .catch((error: Error) => {
  //       setTypes([]);
  //       toast.error(`${error?.response?.data?.message}`);
  //     });
  // }

  useEffect(() => {
    if (user) {
      // findSelectTypesVehicles()
      findVehicles(page, initialTake)
    }
  }, [user])

  return (
    <CustomContent title={"Veículos"}>
      <ModalService
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <SectionVehicle
        data={vehicles}
        find={findVehicles}
        countLimit={limit}
        total={total}
      />
    </CustomContent>
  );
};

export default Service;

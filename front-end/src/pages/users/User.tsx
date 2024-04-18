import { useState, useEffect, SetStateAction } from "react";
import { Container, Loader, Sidebar } from "rsuite";
import CustomContent from "../../components/content/CustomContent";
import ModalUser from "../../components/modal/modalUser/ModalUser";
import Table from "../../components/table/Table";
import axios, { AxiosResponse } from "axios";
import IUser from "../../interfaces/IUser";
import { useAuth } from "../../components/hooks/useAuth";
import { UserService } from "../../services/api/users/UserService";
import { ApiException } from "../../services/api/ApiException";

const User = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState<IUser[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [initialTake, setInitalTake] = useState<number>(6);
  const { token } = useAuth();

  const handleChangePage = (page: number) => {
    setPage(page);
    findUsers(page, limit);
  };

  const findUsers = async (page: number, take: number = 6) => {
    const skip = (page - 1) * take
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/users?skip=${skip}&take=${take}`, { headers: { Authorization: token }})
      .then((res: AxiosResponse) => {
        setData(res.data.results);
        setTotal(res.data.totalPages);
        setLimit(res.data.count);
      })
      .catch((error: Error) => {
        return `Error: ${error.name} | reason: ${error.message}`;
      })
  };

  useEffect(() => {
    UserService.findUsers({ skip: page, take: initialTake, token: token || localStorage.getItem("ACCESS_TOKEN") as string })
      .then((res) => {
        if (res instanceof ApiException) {
          alert("ERRO: " + res.message)
        } else {
          setData(res.results)
          setTotal(res.totalPages);
          setLimit(res.count);
        }
      })
  }, []);

  return (
    <CustomContent title="Usuários">
      <ModalUser
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      {data.length > 0 ? (
        <div style={{ width: "100%", margin: "1rem 0" }}>
          <Table data={data} find={findUsers} total={total} countLimit={limit} handleChangePage={handleChangePage}/>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "12%",
          }}
        >
          <Loader size="lg" />
        </div>
      )}
    </CustomContent>
  );
};

export default User;

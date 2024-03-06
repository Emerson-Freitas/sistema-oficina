import { useState, useEffect } from "react";
import { Container, Loader, Sidebar } from "rsuite";
import CustomContent from "../../components/content/CustomContent";
import ModalUser from "../../components/modal/modalUser/ModalUser";
import Table from "../../components/table/Table";
import axios, { AxiosResponse } from "axios";
import IUser from "../../interfaces/IUser";

const User = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState<IUser[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [initialTake, setInitalTake] = useState<number>(6);

  const handleChangePage = (page: number) => {
    setPage(page);
    findUsers(page, limit);
  };

  const findUsers = async (page: number, take: number = 6) => {
    const skip = (page - 1) * take
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/users?skip=${skip}&take=${take}`)
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
    findUsers(page, initialTake)
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

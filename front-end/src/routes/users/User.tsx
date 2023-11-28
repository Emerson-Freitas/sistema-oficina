import { useState, useEffect } from "react";
import { Container, Loader, Sidebar } from "rsuite";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
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
  // const [skip, setSkip] = useState<number>(0);
  // const [take, setTake] = useState<number>(0);

  useEffect(() => {
    const findUsers = async () => {
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/users`)
        .then((res: AxiosResponse) => {
          setData(res.data);
        })
        .catch((error: Error) => {
          return `Error: ${error.name} | reason: ${error.message}`;
        });
    };

    findUsers();
  }, []);

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <Container>
      <Sidebar width={260} collapsible>
        <SideBar />
      </Sidebar>
      <Container>
        <Header />
        <CustomContent title="Usuários">
          <ModalUser
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
          />
            {data.length > 0 ? 
              <div style={{ width: "100%", margin: "1rem 0" }}>
                <Table data={data} /> 
              </div> 
              : 
              <div style={{ display: "flex", justifyContent: "center", alignItems:"center", marginTop: '12%' }}>
                <Loader 
                  size="lg"
                />
              </div>
            }
        </CustomContent>
      </Container>
    </Container>
  );
};

export default User;

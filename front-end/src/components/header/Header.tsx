import { Navbar, Nav, Drawer, Button, Placeholder } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import CardUser from "../card/CardUser";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    
  }, [user])

  const userName = (userName: string) => {
    return userName.split(' ')[0]
  }
  
  return (
    <div>
      <Navbar style={{ height: "8vh", backgroundColor: "#282F66", width: "100%" }}>
        <Nav
          pullRight
          style={{ display: "flex", alignItems: "center", color: "white" }}
        >
          <div style={{ marginRight: 30 }} >
            <p>Bem vindo: <span style={{ fontWeight: "bold"}}>{userName(`${user?.name}`)}</span></p>
          </div>
          <div onClick={() => setOpen(true)}>
            <Nav.Item icon={<CogIcon onClick={() => setOpen(true)} />}>
              Settings
            </Nav.Item>
          </div>
        </Nav>
      </Navbar>

      <Drawer size={"xs"} open={open} onClose={() => setOpen(false)}>
        <Drawer.Body style={{ overflowX: "hidden", overflowY: "hidden"}}>
            <CardUser
              name={user?.name ?? ''}
              email={user?.email ?? ''}
              role={user?.role?.name ?? ''}
            />
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default Header;

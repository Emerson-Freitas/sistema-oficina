import { Navbar, Nav, Drawer, Button, Placeholder } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import NoticeIcon from '@rsuite/icons/Notice';
import { useState } from "react";
import CardUser from "../card/CardUser";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

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
          <div>
            <Nav.Item icon={<NoticeIcon onClick={() => setOpen(true)} />}/>
          </div>
          <div onClick={() => setOpen(true)}>
            <Nav.Item icon={<CogIcon onClick={() => setOpen(true)} />}/>
          </div>
        </Nav>
      </Navbar>

      <Drawer size={"xs"} open={open} onClose={() => setOpen(false)}>
        <Drawer.Body style={{ overflowX: "hidden", overflowY: "hidden"}}>
            <CardUser
              name={user?.name ?? ""}
              email={user?.email ?? ""}
              role={user?.role?.name ?? ""}
              url_image={`${import.meta.env.VITE_STATIC_BASE_URL}/${user?.picture}`}
            />
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default Header;

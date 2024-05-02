import { Navbar, Nav, Drawer, Button, Placeholder, Badge } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import NoticeIcon from '@rsuite/icons/Notice';
import { useEffect, useState } from "react";
import CardUser from "../card/CardUser";
import { useAuth } from "../hooks/useAuth";
import NotificationComponent from "../notification/NotificationComponent";
import { useNotification } from "../hooks/useNotification";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const { user } = useAuth();
  const { count } = useNotification();
  const [afterOpenNotification, setAfterOpenNotification] = useState<boolean>(false)
  const [viewedCount, setViewedCount] = useState<number>(0);

  const handleCloseNotification = () => {
    setOpenNotification(false)
    setViewedCount(count); 
  }

  const userName = (userName: string) => {
    return userName.split(' ')[0]
  }

  useEffect(() => {
    if (openNotification === true) {
      setAfterOpenNotification(true)
    } else {
      setAfterOpenNotification(false)
    }
  }, [openNotification, count])

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
          <div onClick={() => setOpenNotification(true)}>
            <Nav.Item icon={afterOpenNotification ? <NoticeIcon /> : <Badge content={count - viewedCount}><NoticeIcon /></Badge>} />
          </div>
          <div onClick={() => setOpen(true)}>
            <Nav.Item icon={<CogIcon />}/>
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
      {openNotification && 
        <NotificationComponent 
          open={openNotification} 
          handleCloseNotification={handleCloseNotification}
        />
      }
    </div>
  );
};

export default Header;

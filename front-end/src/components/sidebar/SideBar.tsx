import { useEffect, useState } from 'react';
import { Sidebar as RSuiteSideBar, Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import ToolsIcon from '@rsuite/icons/Tools';
import DocPassIcon from '@rsuite/icons/DocPass';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom'
import NavToggle from './NavToggle';
import { useAuth } from '../hooks/useAuth';
import logoMax from '../../assets/logo-max.png'
import logoMin from '../../assets/logo-min.png'
import { useTheme } from '../hooks/useTheme';

const SideBar = () => {
    const [expand, setExpand] = useState(() => {
      const storedValue = localStorage.getItem("SIDEBAR_EXPAND");
      return storedValue ? JSON.parse(storedValue) : false;
    });
    const { user } = useAuth();
    const { theme } = useTheme()

    useEffect(() => {
      localStorage.setItem("SIDEBAR_EXPAND", JSON.stringify(expand));
    }, [expand]);

    return (
      <RSuiteSideBar
        style={{ display: "flex", flexDirection: "column"}}
        width={expand ? 220 : 56}
        collapsible
      >
        <Sidenav>
          <Sidenav.Header style={{ height: '8vh'}}>
            <div className={styles.content}>
              { expand ? <img src={logoMax} alt='Logo no tamanho máximo' className={styles.logo}/> : <img src={logoMin} alt='Logo no tamanho mínimo' className={styles.logo}/>}
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["5"]}
            appearance="subtle"
          >
            <Sidenav.Body style={{ height: "84vh" }} >
              {user?.role.name === "ADMIN" && (
                <Nav activeKey="1">
                  <Nav.Item  icon={<DashboardIcon/>} as={Link} to="/dashboard"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Dashboard</p></Nav.Item>
                  <Nav.Item icon={<PeoplesIcon />} as={Link} to="/users"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Usuários</p></Nav.Item>
                  <Nav.Item icon={<CreditCardPlusIcon />} as={Link} to="/budgets"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Orçamentos</p></Nav.Item>
                  <Nav.Item icon={<ToolsIcon />} as={Link} to="/vehicles"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Veículos</p></Nav.Item>
                  <Nav.Item icon={<DocPassIcon />} as={Link} to="/reports"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Relatórios</p></Nav.Item>
                </Nav>
              )}
              {user?.role.name === "CLIENTE" && (
                <Nav activeKey="1">
                  <Nav.Item  icon={<DashboardIcon/>} as={Link} to="/dashboard"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Dashboard</p></Nav.Item>
                  <Nav.Item icon={<CreditCardPlusIcon />} as={Link} to="/budgets"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Orçamentos</p></Nav.Item>
                  <Nav.Item icon={<ToolsIcon />} as={Link} to="/vehicles"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Veículos</p></Nav.Item>
                </Nav>
              )}
              {user?.role.name === "FUNCIONARIO" && (
                <Nav activeKey="1">
                 <Nav.Item  icon={<DashboardIcon/>} as={Link} to="/dashboard"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Dashboard</p></Nav.Item>
                 <Nav.Item icon={<CreditCardPlusIcon />} as={Link} to="/budgets"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Orçamentos</p></Nav.Item>
                 <Nav.Item icon={<ToolsIcon />} as={Link} to="/vehicles"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Veículos</p></Nav.Item>
                 <Nav.Item icon={<DocPassIcon />} as={Link} to="/reports"><p style={{ color: theme === "dark" ? "#007acc" : "" }} className={styles.text}>Relatórios</p></Nav.Item>
                </Nav>
              )}
            </Sidenav.Body>
          </Sidenav>
        </Sidenav>
        <div>
            <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </div>
      </RSuiteSideBar>
    );
}

export default SideBar
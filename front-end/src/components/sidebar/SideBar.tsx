import { useContext, useEffect, useState } from 'react';
import { Sidebar as RSuiteSideBar, Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom'
import NavToggle from './NavToggle';
import { AuthContext } from '../../contexts/AuthContext';

const textStyles = {
  textDecoration: "none"
}
const SideBar = () => {
    const [expand, setExpand] = useState(true);
    const { user } = useContext(AuthContext)

    return (
      <RSuiteSideBar
        style={{ display: "flex", flexDirection: "column"}}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav style={{ height: '92vh'}}>
          <Sidenav.Header>
            <div className={styles.content}>
              <span>Brand</span>
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["5"]}
            appearance="subtle"
          >
            <Sidenav.Body >
              {user?.role.name === "ADMIN" && (
                <Nav activeKey="1">
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/dashboard"} style={textStyles}>
                      <div>Dashboard</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/users"} style={textStyles}>
                      <div>Usuários</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/budgets"} style={textStyles}>
                      <div>Orçamentos</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/vehicles"} style={textStyles}>
                      <div>Veículos</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/reports"} style={textStyles}>
                      <div>Relatórios</div>
                    </Link>
                  </Nav.Item>
                </Nav>
              )}

              {user?.role.name === "CLIENTE" && (
                <Nav activeKey="1">
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/dashboard"} style={textStyles}>
                      <div>Dashboard</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/budgets"} style={textStyles}>
                      <div>Orçamentos</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/vehicles"} style={textStyles}>
                      <div>Veículos</div>
                    </Link>
                  </Nav.Item>
                </Nav>
              )}

              {user?.role.name === "FUNCIONARIO" && (
                <Nav activeKey="1">
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/dashboard"} style={textStyles}>
                      <div>Dashboard</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/budgets"} style={textStyles}>
                      <div>Orçamentos</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/vehicles"} style={textStyles}>
                      <div>Veículos</div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item icon={<DashboardIcon />}>
                    <Link to={"/reports"} style={textStyles}>
                      <div>Relatórios</div>
                    </Link>
                  </Nav.Item>
                </Nav>
              )}
            </Sidenav.Body>
          </Sidenav>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </RSuiteSideBar>
    );
}

export default SideBar
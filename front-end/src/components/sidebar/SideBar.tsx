import { useState } from 'react';
import { Container, Sidebar, Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import styles from './SideBar.module.css';
import NavToggle from './NavToggle';
import { Link } from 'react-router-dom'

const SideBar = () => {
    const [expand, setExpand] = useState(true);
    return (
        <div>
          <Container>
            <Sidebar
              className={styles.container}
              width={expand ? 260 : 56}
              collapsible
            >
              <Sidenav.Header>
                <div className={styles.content}>
                    {expand ? (
                        <span>Brand</span>
                    ) : (
                        <span>B</span>
                    )}
                </div>
              </Sidenav.Header>
              <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle" >
                <Sidenav.Body>
                  <Nav className={styles.text}>
                    <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                      <Link to={'/dashboard'}>Dashboard</Link>
                    </Nav.Item>
                    <Nav.Item eventKey="2" icon={<GroupIcon />}>
                      <Link to={'/users'}>Usuários</Link>
                    </Nav.Item>
                    <Nav.Item eventKey="3" icon={<GroupIcon />}>
                      <Link to={'/reports'}>Relatórios</Link>
                    </Nav.Item>
                    <Nav.Item eventKey="4" icon={<GroupIcon />}>
                      <Link to={'/budgets'}>Orçamentos</Link>
                    </Nav.Item>
                    <Nav.Menu
                      eventKey="3"
                      trigger="hover"
                      title="Serviços"
                      icon={<MagicIcon />}
                      placement="rightStart"
                    >
                      <Nav.Item eventKey="3-1">
                        <Link to={'/services/vehicles'}>Veículos</Link>
                      </Nav.Item>
                    </Nav.Menu>
                  </Nav>
                </Sidenav.Body>
              </Sidenav>
              <div className={styles.settings}>
                <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
              </div>
            </Sidebar>
          </Container>
        </div>
      );
}

export default SideBar
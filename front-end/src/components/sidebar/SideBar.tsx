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
import { string } from 'prop-types';

interface Navigate {
  label: string
  value: string
}

const SideBar = () => {
    const [expand, setExpand] = useState(true);
    const { user } = useContext(AuthContext)
    const [navigates, setNavigates] = useState<Navigate[]>([])

    useEffect(() => {
      if (user?.role.name === 'ADMIN') {
        const navigates = [
          {
            label: 'Dashboard',
            value: 'dashboard'
          },
          {
            label: 'Usuários',
            value: 'users'
          },
          {
            label: 'Relatórios',
            value: 'reports'
          },
          {
            label: 'Orçamentos',
            value: 'budgets'
          },
          {
            label: 'Veículos',
            value: 'vehicles'
          }
        ]
        setNavigates(navigates)
      }

      if (user?.role.name === 'CLIENTE') {
        const navigates = [
          {
            label: 'Dashboard',
            value: 'dashboard'
          },
          {
            label: 'Relatórios',
            value: 'reports'
          },
          {
            label: 'Orçamentos',
            value: 'budgets'
          },
          {
            label: 'Veículos',
            value: 'vehicles'
          }
        ]
        setNavigates(navigates)
      }

      if (user?.role.name === 'FUNCIONARIO') {
        const navigates = [
          {
            label: 'Dashboard',
            value: 'dashboard'
          },
          {
            label: 'Relatórios',
            value: 'reports'
          },
          {
            label: 'Orçamentos',
            value: 'budgets'
          },
          {
            label: 'Veículos',
            value: 'vehicles'
          }
        ]
        setNavigates(navigates)
      }
    }, [user])


    useEffect(() => {
      console.log('navigates::::', navigates)
    }, [navigates])

    return (
      <RSuiteSideBar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav>
          <Sidenav.Header>
            <div className={styles.content}>
              <span>Brand</span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['5']} appearance="subtle" >
            <Sidenav.Body>
              <Nav activeKey="1">
                {navigates.map((navigate: Navigate, index: any) => (
                 <Nav.Item eventKey={index} icon={<DashboardIcon />}>
                  <Link to={`/${navigate.value}`}>{navigate.label}</Link>
                </Nav.Item>         
                ))}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </RSuiteSideBar>
    );
}

export default SideBar
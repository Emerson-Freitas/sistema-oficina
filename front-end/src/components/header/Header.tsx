import { Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';

const Header = () => {
  return (
    <Navbar style={{ height: 59, backgroundColor: "#282F66" }}>
      <Nav pullRight style={{ display: 'flex', alignItems: 'center', color: "white"}}>
        <div style={{ marginRight: 30}}>
          <p>Olá, Emerson</p>
        </div>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav>
    </Navbar>
  )
}

export default Header
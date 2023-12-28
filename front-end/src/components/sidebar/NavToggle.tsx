import { Nav } from "rsuite";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";

interface Props {
  expand: boolean;
  onChange: () => void;
}

const NavToggle = ({ expand, onChange }: Props) => {
  return (
    <Nav pullRight>
      <Nav.Item onClick={onChange} style={{ width: "100%", textAlign: "center", height: "8vh" }}>
        {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
      </Nav.Item>
    </Nav>
  );
};

export default NavToggle;

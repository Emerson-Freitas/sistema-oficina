import { Nav } from "rsuite";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import styles from '../sidebar/NavToggle.module.css'

interface Props {
  expand: boolean;
  onChange: () => void;
}

const NavToggle = ({ expand, onChange }: Props) => {
  return (
    <Nav pullRight>
      <Nav.Item onClick={onChange} className={styles.item} >
        {expand ? <AngleLeftIcon className={styles.icon} /> : <AngleRightIcon className={styles.icon} />}
      </Nav.Item>
    </Nav>
  );
};

export default NavToggle;

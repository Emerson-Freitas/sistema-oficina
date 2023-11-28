import { Container, Sidebar } from "rsuite";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";

const Report = () => {
  return(
    <Container>
      <Sidebar width={260} collapsible>
        <SideBar />
      </Sidebar>
      <Container>
        <Header/>
      </Container>
    </Container>
  )
};

export default Report;

import { Container, Content } from "rsuite";
import Header from "../header/Header";
import SideBar from "../sidebar/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <SideBar />
        <Container>
          <Header/>
          <Content>
            {children}
          </Content>
        </Container>
      </Container>
    </div>
  );
};

export default Layout;

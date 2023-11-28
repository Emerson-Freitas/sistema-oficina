import { useState } from "react";
import { Container, Sidebar } from "rsuite";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import CustomContent from "../../components/content/CustomContent";
import ModalService from "../../components/modal/modalService/ModalService";

const Service = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return(
    <Container>
    <Sidebar width={260} collapsible>
      <SideBar />
    </Sidebar>
    <Container>
      <Header/>
      <CustomContent
        title={"Meus Veículos"}
      >
        <ModalService open={open} handleClose={handleClose} handleOpen={handleOpen} />
      </CustomContent>
    </Container>
  </Container>
  )
};

export default Service;

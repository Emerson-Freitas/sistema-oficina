import { useState } from "react";
import { Container, Sidebar } from "rsuite";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import CustomContent from "../../components/content/CustomContent";
import ModalBudget from "../../components/modal/modalBudget/ModalBudget";

const Budget = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Container>
      <Sidebar width={260} collapsible>
        <SideBar />
      </Sidebar>
      <Container>
        <Header/>
        <CustomContent
          title="Orçamentos"
        >
          <ModalBudget
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
          />
        </CustomContent>
      </Container>
    </Container>
  );
};

export default Budget;

import { Container, Sidebar } from "rsuite";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import CustomContent from "../../components/content/CustomContent";
import ModalService from "../../components/modal/modalService/ModalService";
import { useState } from "react";
const Report = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return(
    <CustomContent title={"Meus Veículos"}>
    <ModalService
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
    />
  </CustomContent>
  )
};

export default Report;

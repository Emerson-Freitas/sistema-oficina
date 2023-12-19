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

  return (
    <CustomContent title={"Meus Veículos"}>
      <ModalService
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </CustomContent>
  );
};

export default Service;

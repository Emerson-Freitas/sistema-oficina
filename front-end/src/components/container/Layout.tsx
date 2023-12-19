import { Sidenav, Nav, Container, Content } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import { Link } from "react-router-dom";
import styles from './Layout.module.css';
import React from "react";
import SideBar from "../sidebar/SideBar";
import Header from "../header/Header";

const Layout = ({ children }: {children: React.ReactElement}) => {
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

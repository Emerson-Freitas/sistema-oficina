import React, { useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import { Button, Drawer } from "rsuite";
import INotification from "../../interfaces/INotification";
import { formatDate } from "../../utils/FormatDate";
import styles from "./NotificationComponent.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  handleCloseNotification: () => void;
}

const NotificationComponent = ({ open, handleCloseNotification }: Props) => {
  const { notification } = useNotification();
  const [visibleScroll, setVisibleScroll] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleScroll(notification.length > 6);
  }, [notification])

  const handleClick = () => {
    navigate("/budgets", { replace: true })
  }

  return (
    <Drawer size={"xs"} open={open} onClose={handleCloseNotification} style={{ overflowY: visibleScroll ? "auto" : "hidden" }}>
      <Drawer.Header>
        <Drawer.Title>Notificações</Drawer.Title>
      </Drawer.Header>
      <div className={styles.content}>
        {notification.length < 1 && <p>Nenhuma notificação no momento!</p>}
        {notification.map((data: INotification, index: number) => (
          <div key={index} className={styles.card} onClick={handleClick}>
            <p>Descrição: {data.description}</p>
            <p>Usuário: {data.userName}</p>
            <p>Data de Criação: {formatDate(data.created_at)}</p>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default NotificationComponent;

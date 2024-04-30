import React, { useEffect } from "react";
import { useNotification } from "../hooks/useNotification";
import { Drawer } from "rsuite";
import INotification from "../../interfaces/INotification";
import { formatDate } from "../../utils/FormatDate";

interface Props {
  open: boolean;
  handleCloseNotification: () => void;
}

const NotificationComponent = ({ open, handleCloseNotification }: Props) => {
  const { notification } = useNotification();

  return (
    <Drawer size={"xs"} open={open} onClose={handleCloseNotification}>
      <Drawer.Body style={{ overflowX: "hidden", overflowY: "hidden" }}>
          {notification.length < 1 && (
              <p>Nenhuma notificação no momento!</p>
          )}
          {notification.map((data: INotification, index: number) => (
            <div key={index}>
              <p>Descrição: {data.description}</p>
              <p>Usúario: {data.userName}</p>
              <p>Data de Criação: {formatDate(data.created_at)}</p>
            </div>
          ))}
      </Drawer.Body>
    </Drawer>
  );
};

export default NotificationComponent;

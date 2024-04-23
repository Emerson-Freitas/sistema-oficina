import React, { PropsWithChildren, ReactNode, createContext, useContext, useState } from "react";
import INotification from "../interfaces/INotification";

type NotificationProviderProps = {
    notification: INotification[]
    setNotification: React.Dispatch<React.SetStateAction<INotification[]>>
}

type notificationProviderProps = PropsWithChildren

export const NotificationContext = createContext<NotificationProviderProps | undefined>(undefined);

export default function NotificationProvider({ children }:  notificationProviderProps) {
  const [notification, setNotification] = useState<INotification[]>([]);
  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
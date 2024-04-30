import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import INotification from "../interfaces/INotification";
import Budget from "../pages/budgets/Budget";
import io, { Socket } from 'socket.io-client'
import { useAuth } from "../components/hooks/useAuth";
import { NotificationService } from "../services/api/notification/NotificationService";
import { ApiException } from "../services/api/ApiException";
import { toast } from "react-toastify";
import { ROLE } from "../enum/Role";
const ENDPOINT = "http://localhost:3000";
const socket = io(ENDPOINT)

type NotificationProviderProps = {
  notification: INotification[];
  setNotification: React.Dispatch<React.SetStateAction<INotification[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

type notificationProviderProps = PropsWithChildren;

export const NotificationContext = createContext<
  NotificationProviderProps | undefined
>(undefined);

export default function NotificationProvider({ children }: notificationProviderProps) {
  const [notification, setNotification] = useState<INotification[]>([]);
  const [count, setCount] = useState<number>(0)
  const { user, token } = useAuth();

  useEffect(() => {
    if (user?.role.name === ROLE.CLIENTE) {
      NotificationService.notificationsByUserClient({ token, id: user.id })
        .then((res) => {
          if (res instanceof ApiException) {
            toast.error(res.message)
          } else {
            setNotification(res)
          }
        })
    } 

    if (user?.role.name === ROLE.ADMIN || user?.role.name === ROLE.FUNCIONARIO) {
      NotificationService.notificationsAdminAndEmployee({ token })
        .then((res) => {
          if (res instanceof ApiException) {
            toast.error(res.message)
          } else {
            setNotification(res)
          }
        })
    }
  }, [user, token])

  useEffect(() => {
    socket.emit("user logged", user?.id)
  }, [user])

  useEffect(() => {
    socket.on("create budget", (newBudget: INotification) => {
      console.log("newBudget", newBudget)
      setNotification([...notification, newBudget as INotification])
      setCount(count + 1)
    });

    return () => {
      socket.off();
    };
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        count, 
        setCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

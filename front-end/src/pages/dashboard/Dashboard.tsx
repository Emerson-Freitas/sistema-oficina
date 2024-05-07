import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import { useAuth } from "../../components/hooks/useAuth";
import {ROLE} from '../../enum/Role'

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {user?.role.name === ROLE.CLIENTE && <ClientDashboard/>}
      {user?.role.name === ROLE.ADMIN && <AdminDashboard/> || user?.role.name === ROLE.FUNCIONARIO && <AdminDashboard/>}
    </div>
  );
};

export default Dashboard;

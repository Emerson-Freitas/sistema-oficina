import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import { useAuth } from "../../components/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {user?.role.name === 'CLIENTE' && <ClientDashboard/>}
      {user?.role.name === 'ADMIN' && <AdminDashboard/>}
    </div>
  );
};

export default Dashboard;

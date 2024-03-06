import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user?.role.name === 'CLIENTE' && <ClientDashboard/>}
      {user?.role.name === 'ADMIN' && <AdminDashboard/>}
    </div>
  );
};

export default Dashboard;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState<string>("")

  useEffect(() => {
    if(user) {
      setRole(user.role.name)
    }
  }, [user])

  console.log('user::::', user?.role.name)
  return (
    // <AdminDashboard/>
    <div>
      {/* {user?.role.name === 'CLIENTE' && <ClientDashboard/>} */}
      {role === 'ADMIN' && <AdminDashboard/>}
    </div>
  );
};

export default Dashboard;

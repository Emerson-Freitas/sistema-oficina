import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/container/Layout";
import { ROLE } from "../enum/Role";
import Budget from "../pages/budgets/Budget";
import Dashboard from "../pages/dashboard/Dashboard";
import AccessDenied from "../pages/errors/AccessDenied";
import NotFound from "../pages/errors/NotFound";
import Login from "../pages/login/Login";
import Report from "../pages/reports/Report";
import Service from "../pages/services/Service";
import User from "../pages/users/User";
import PrivateRoutes from "./PrivateRoutes";
import { useEffect } from "react";
import { useAuth } from "../components/hooks/useAuth";

const Root = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("USER")
    const token = localStorage.getItem("ACCESS_TOKEN")
    if (user && token) {
      navigate(location.pathname)
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route  path="*" element={<NotFound/>}/>
      <Route 
        path="/dashboard"
        element={
            <PrivateRoutes roles={[ROLE.ADMIN, ROLE.CLIENTE, ROLE.FUNCIONARIO]}>
                <Layout>
                    <Dashboard/>
                </Layout>
            </PrivateRoutes>
        }
      />
      <Route 
        path="/users"
        element={
          <PrivateRoutes roles={[ROLE.ADMIN]}>
              <Layout>
                <User/>
              </Layout>
          </PrivateRoutes>
      }
      />
       <Route 
        path="/budgets"
        element={
          <PrivateRoutes roles={[ROLE.ADMIN, ROLE.CLIENTE, ROLE.FUNCIONARIO]}>
              <Layout>
                <Budget/>
              </Layout>
          </PrivateRoutes>
      }
      />
      <Route 
        path="/vehicles"
        element={
          <PrivateRoutes roles={[ROLE.ADMIN, ROLE.CLIENTE, ROLE.FUNCIONARIO]}>
              <Layout>
                <Service/>
              </Layout>
          </PrivateRoutes>
      }
      />
      <Route 
        path="/reports"
        element={
          <PrivateRoutes roles={[ROLE.ADMIN, ROLE.FUNCIONARIO]}>
              <Layout>
                <Report/>
              </Layout>
          </PrivateRoutes>
      }
      />
    </Routes>
  );
};

export default Root;

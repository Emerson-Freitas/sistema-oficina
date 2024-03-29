import { Route, Routes as Router } from "react-router-dom";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Budget from "../pages/budgets/Budget";
import Report from "../pages/reports/Report";
import Service from "../pages/services/Service";
import User from "../pages/users/User";
import { ROLE } from "../enum/Role";
import AccessDenied from "../pages/errors/AccessDenied";
import NotFound from "../pages/errors/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "../components/container/Layout";
import { useAuth } from "../components/hooks/useAuth";

const Routes = () => {
  const { authenticated } = useAuth();

  return (
    <Router>
      {authenticated && <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} />}
      {!authenticated && <Route path="/login" element={<Login />} />}
      <Route path="*" element={<NotFound />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route
        element={
          <PrivateRoutes roles={[ROLE.ADMIN, ROLE.CLIENTE, ROLE.FUNCIONARIO]} />
        }
      >
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/budgets"
          element={
            <Layout>
              <Budget />
            </Layout>
          }
        />
        <Route
          path="/vehicles"
          element={
            <Layout>
              <Service />
            </Layout>
          }
        />
      </Route>
      <Route element={<PrivateRoutes roles={[ROLE.ADMIN, ROLE.FUNCIONARIO]} />}>
        <Route
          path="/budgets"
          element={
            <Layout>
              <Budget />
            </Layout>
          }
        />
        <Route
          path="/vehicles"
          element={
            <Layout>
              <Service />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <Report />
            </Layout>
          }
        />
      </Route>
      <Route element={<PrivateRoutes roles={[ROLE.ADMIN]} />}>
        <Route
          path="/users"
          element={
            <Layout>
              <User />
            </Layout>
          }
        />
      </Route>
    </Router>
  );
};

export default Routes;

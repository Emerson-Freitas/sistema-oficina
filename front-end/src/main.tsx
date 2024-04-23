import * as ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import "./index.css";
import NotificationProvider from "./contexts/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <NotificationProvider>
      <App/>
    </NotificationProvider>
  </AuthProvider>
);
import * as ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import "./index.css";
import NotificationProvider from "./contexts/NotificationContext";
import ThemeProvider from "./contexts/ThemeContext";
import CustomProvider from "./components/custom-provider/CustomProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider>
      <NotificationProvider>
        <CustomProvider>
          <App/>
        </CustomProvider>
      </NotificationProvider>
    </ThemeProvider>
  </AuthProvider>
);
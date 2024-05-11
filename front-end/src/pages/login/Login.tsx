import { Form, Button, Schema, Container, Input, InputGroup } from "rsuite";
import { toast } from "react-toastify";
import React, { useEffect, useState, useContext } from "react";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/hooks/useAuth";
import { useTheme } from "../../components/hooks/useTheme";

interface Auth {
  email: string;
  password: string;
}

const Login = () => {
  const { theme } = useTheme()
  const [credentials, setCredentials] = useState<Auth>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleChange = (name: string, value: string) => {
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!credentials.email || !credentials.password) {
      toast.warning("Por favor preencha todos os campos!")
    }
    if (credentials.email && credentials.password) {
      setLoading(true);
      const isLogged = signIn(credentials)
      isLogged
        .then(() => navigate("/dashboard"))
        .catch(() => navigate("/login"))
        .finally(() => setLoading(false))
    }
  };

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme === 'light' ? "#3e3e42" : ""
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          style={{
            padding: "5% 3% 2.5% 2.5%",
            backgroundColor: theme === 'light' ? "whitesmoke" : "#3e3e42",
            borderRadius: "10px",
          }}
        >
          <Input
            type="text"
            name="email"
            value={credentials.email}
            placeholder="Email"
            onChange={(value: string) => handleChange("email", value)}
          />
          <InputGroup style={{ display: "flex", marginBottom: "10px" }}>
            <Input
              type={visible ? "text" : "password"}
              name="password"
              value={credentials.password}
              style={{ padding: "14px" }}
              placeholder="Senha"
              onChange={(value: string) => handleChange("password", value)}
            />
            <InputGroup.Button
              onClick={handleVisible}
              style={{ display: "center", alignItems: "center", backgroundColor: theme === 'light' ? "whitesmoke" : '#1A1D24' }}
            >
              {visible ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
          <Button
            appearance="primary"
            type="submit"
            onClick={handleSubmit}
            loading={loading}
          >
            Entrar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;

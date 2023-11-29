import { Form, Button, Schema, Container, Input, InputGroup } from "rsuite";
import { toast } from "react-toastify";
import React, { useEffect, useState, useContext } from "react";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// const loginRule = Schema.Types.StringType().isRequired(
//   "Informe o login."
// );
// const passwordRule = Schema.Types.StringType().isEmail(
//   "Informe a senha."
// );

// function UsernameField() {
//   return (
//     <Form.Group controlId="login">
//       <Form.ControlLabel>Login</Form.ControlLabel>
//       <Form.Control name="login" rule={loginRule} />
//     </Form.Group>
//   );
// }

// function EmailField() {
//   return (
//     <Form.Group controlId="password">
//       <Form.ControlLabel>Senha</Form.ControlLabel>
//       <Form.Control type="password" name="password" rule={passwordRule} />
//     </Form.Group>
//   );
// }

interface Auth {
  login: string;
  password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<Auth>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<boolean>(true);
  const { setAuth, auth } = useContext(AuthContext);
  
  console.log('auth login', auth)
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
    setLoading(true);

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/login`, credentials)
      .then((res: AxiosResponse) => {
        toast.success(`${res.data.message}`, {
          autoClose: 2000
        });

        setTimeout(() => {
          setAuth(true);
          navigate('/dashboard');
        }, 2000); 
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
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
            backgroundColor: "whitesmoke",
            borderRadius: "10px",
          }}
        >
          <Input
            type="text"
            name="email"
            value={credentials.login}
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
              style={{ display: "center", alignItems: "center" }}
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

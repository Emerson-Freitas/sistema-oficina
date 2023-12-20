import React, { useContext, useState } from "react";
import { Button, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
  url_image?: string;
  name: string;
  email: string;
  role?: string;
}

const CardUser = ({ url_image, name, email, role }: Props) => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext)

  const handleClick = () => {
    setLoading(true)
    toast.success(`Saindo da aplicação...`, {
      autoClose: 1000
    })
    setAuthenticated(false)
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('USER')
    setLoading(false)
    navigate('/login')
  }

  return (
    <div
      style={{
        padding: 20,
        width: 300,
        height: "auto",
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "12%",
      }}
    >
      <img
        src={
          url_image ?? "https://avatars.githubusercontent.com/u/108194763?v=4"
        }
        alt={`Usuário: ${name}`}
        width="150"
        height="150"
        style={{
          borderRadius: "50%",
          marginBottom: 20,
          border: "4px solid #fff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
      <div style={{ textAlign: "left" }}>
        <h6 style={{ margin: 0, marginBottom: 5, marginTop: 10 }}>Nome: {name}</h6>
        <h6 style={{ margin: 0, marginBottom: 5 }}>E-mail: {email}</h6>
        <h6 style={{ margin: 0, marginBottom: 30 }}>Função: {role}</h6>
        <Button
          appearance="primary"
          color="red"
          size="md"
          style={{ width: "60px", textAlign: "center"}}
          loading={loading}
          onClick={handleClick}
        >
        SAIR
        </Button>
      </div>
      
    </div>
  );
};

export default CardUser;

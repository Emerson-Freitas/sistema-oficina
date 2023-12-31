import Header from "../../components/header/Header";
import { Button, Container } from "rsuite";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {

  const navigate = useNavigate()

  const handleDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <div>
      <Header />
      <div
        style={{
          height: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container
          style={{
            backgroundColor: "whitesmoke",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
          }}
        >
          <h1 style={{ fontSize: 120, fontWeight: "bold", marginBottom: 20 }}>
            403
          </h1>
          <p
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#555",
              marginTop: 20,
              marginBottom: 10
            }}
          >
            Acesso negado!
          </p>
          <Button 
            appearance="primary"
            color="red"
            size="lg"
            onClick={handleDashboard}
          >
            Voltar para Home
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default AccessDenied;

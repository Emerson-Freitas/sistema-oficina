import { Row } from 'rsuite';
import CardDashboard from '../../components/card/dashboard/CardDashboard';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../../components/hooks/useAuth';

const AdminDashboard = () => {
  const { token } = useAuth()
  const [data, setData] = useState<any>([])

  

  useEffect(() => {
    const findBudgets = async () => {
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/admin/dashboard`, { headers: { Authorization: token }})
        .then((res: AxiosResponse) => {
          console.log("res>>>", res.data)
          setData(res.data.budgets);
        })
        .catch((error: Error) => {
          console.log(`${error.response.data.message}`);
        })
    }
    findBudgets()
  }, [])

  return (
    <Row style={{ width: "100%", display: 'flex', justifyContent:"center", gap: "1.2%", marginTop: "1%"}}>
      <CardDashboard title='Orçamentos Relizados' color='#3CB371'/>
      <CardDashboard title='Orçamentos Pendentes' color='#FFD700'/>
      <CardDashboard title='Orçamentos Rejeitados' color='#FF6347'/>
    </Row>
  );
};

export default AdminDashboard
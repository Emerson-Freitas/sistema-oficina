import { Row } from 'rsuite';
import CardDashboard from '../../components/card/dashboard/CardDashboard';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../../components/hooks/useAuth';
import AdminChart from '../../components/charts/AdminChart';
import styles from '../../components/charts/AdminChart.module.css'

const AdminDashboard = () => {
  const { token } = useAuth()
  const [analysis, setAnalysis] = useState<number>(0)
  const [accepted, setAccepted] = useState<number>(0)
  const [rejected, setRejected] = useState<number>(0)

  useEffect(() => {
    const findBudgets = async () => {
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/admin/dashboard`, { headers: { Authorization: token }})
        .then((res: AxiosResponse) => {
          if (res.data['EM ANÁLISE'] !== undefined) {
            setAnalysis(res.data["EM ANÁLISE"])
          }
          if (res.data['ACEITO'] !== undefined) {
            setAccepted(res.data["ACEITO"])
          }
          if (res.data['REJEITADO'] !== undefined) {
            setRejected(res.data["REJEITADO"])
          }
        })
        .catch((error: Error) => {
          console.log(`${error.response.data.message}`);
        })
    }
    findBudgets()
  }, [])

  return (
    <>
      <Row style={{ width: "100%", display: 'flex', justifyContent:"center", gap: "1.2%", marginTop: "1%"}}>
        <CardDashboard count={accepted} title='Orçamentos Aceitos' color='#3CB371'/>
        <CardDashboard count={analysis} title='Orçamentos Pendentes' color='#FFD700'/>
        <CardDashboard count={rejected} title='Orçamentos Rejeitados' color='#FF6347'/>
      </Row>
      <div className={styles.chartContainer}>
        <AdminChart/>
      </div>
    </>
  );
};

export default AdminDashboard
import { useContext, useEffect, useState } from "react";
import CustomContent from "../../components/content/CustomContent";
import ModalBudget from "../../components/modal/modalBudget/ModalBudget";
import axios, { AxiosResponse } from "axios";
import CardBudget from "../../components/card/budgets/CardBudget";
import { Loader } from "rsuite";
import { AuthContext } from "../../contexts/AuthContext";
import ListBudget from "../../components/card/budgets/ListBudget";

interface IVehicle {
  name: string
}

interface IBudget {
  id: string
  description: string
  user_id: string
  value: string | number
  vehicle: IVehicle
  status: string
  created_at: Date | undefined
}


const Budget = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState<IBudget[]>([])
  const { user } = useContext(AuthContext)
  const [budgets, setBudgets] = useState<IBudget[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)

  const findBudgets = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/budgets`)
      .then((res: AxiosResponse) => {
        setData(res.data)
      })
      .catch((error: Error) => {
        console.log(`${error.response.data.message}`);
      })
  }

  const findBudgetsByUser = async () => {
    if (user?.id) {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/budgets/${user?.id}`)
      .then((res: AxiosResponse) => {
        console.log('res.data>>>>', res.data)
        setBudgets(res.data.budgets)
        setTotalPages(res.data.totalPages)
        setTotalCount(res.data.totalCount)
      })
      .catch((error: Error) => {
        console.log(`${error.response.data.message}`);
      })
    }
  }

  useEffect(() => {
    if (user?.role.name === 'ADMIN') {
      findBudgets()
    } else {
      findBudgetsByUser()
    }
  }, [user])

  return (
    <CustomContent title="Orçamentos">
      <ModalBudget
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      {user?.role.name === 'ADMIN' && (
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            height: "56vh",
            marginTop: '2.5%',
            gap: "2.5%",
          }}
      >
        {data.length <= 0 && 
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            <Loader size="lg"/>
          </div>
        }
        {data.map((item: IBudget) => (
          <CardBudget
            key={item.id}
            value={item.value}
            description={item.description}
            created_at={item.created_at}
            vehicle={item.vehicle.name}
          />
        ))}
      </section>
    )}
    {user?.role.name === 'CLIENTE' && (
      <div style={{ marginTop: "2%"}}>
        <ListBudget
          budgets={budgets}
          totalPages={totalPages}
          totalCount={totalCount}
        />
      </div>
    )}
    </CustomContent>
  );
};

export default Budget;

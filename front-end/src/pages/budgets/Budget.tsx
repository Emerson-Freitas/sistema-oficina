import { useEffect, useState } from "react";
import CustomContent from "../../components/content/CustomContent";
import ModalBudget from "../../components/modal/modalBudget/ModalBudget";
import axios, { AxiosResponse } from "axios";
import CardBudget from "../../components/card/budgets/CardBudget";
import { Loader } from "rsuite";

interface IVehicle {
  name: string
}
interface IBudget {
  id: string
  description: string
  user_id: string
  value: string | number
  vehicle: IVehicle
  created_at?: Date | undefined
}

const Budget = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState<IBudget[]>([])
  
  const findBudgets = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/budgets`)
      .then((res: AxiosResponse) => {
        setData(res.data)
      })
      .catch((error: Error) => {
        console.log(`${error.response.data.message}`);
      })
  }

  useEffect(() => {
    findBudgets()
  }, [])

  return (
    <CustomContent title="Orçamentos">
      <ModalBudget
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
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
          // style={{ flexBasis: "30%" }} // Ajuste o valor conforme necessário
        />
      ))}
    </section>
    </CustomContent>
  );
};

export default Budget;

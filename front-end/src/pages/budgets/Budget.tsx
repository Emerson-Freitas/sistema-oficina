import { useContext, useEffect, useState } from "react";
import CustomContent from "../../components/content/CustomContent";
import ModalBudget from "../../components/modal/modalBudget/ModalBudget";
import axios, { AxiosResponse } from "axios";
import CardBudget from "../../components/card/budgets/CardBudget";
import { Loader } from "rsuite";
import { AuthContext } from "../../contexts/AuthContext";
import ListBudget from "../../components/card/budgets/ListBudget";
import CustomPagination from "../../components/pagination/CustomPagination";
import SectionCard from "../../components/section/SectionCard";
import IBudget from "../../interfaces/IBudget";

const Budget = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState<IBudget[]>([])
  const { user } = useContext(AuthContext)
  const [total, setTotal] = useState<number>(0)
  const [limit, setLimit] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [initialTake, setInitialTake] = useState<number>(6)
  const [loading, setLoading] = useState<boolean>(false)

  const findBudgets = async (page: number, take: number = 6) => {
    const skip = (page - 1) * take
    await axios.get(`${import.meta.env.VITE_BASE_URL}/budgets?skip=${skip}&take=${take}`)
      .then((res: AxiosResponse) => {
        setLoading(true)
        setData(res.data.budgets)
        setTotal(res.data.totalPages)
        setLimit(res.data.count)
      })
      .catch((error: Error) => {
        console.log(`${error.response.data.message}`);
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (user?.role.name === 'ADMIN') {
      findBudgets(page, initialTake)
    } 
  }, [])

  return (
    <CustomContent title="Orçamentos">
      <ModalBudget
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      {user?.role.name === 'ADMIN' && (
        <>
          <SectionCard 
            loading={loading} 
            data={data}
            find={findBudgets}
            total={total}
            countLimit={limit}
          />
      </>
    )}
    </CustomContent>
  );
};

export default Budget;

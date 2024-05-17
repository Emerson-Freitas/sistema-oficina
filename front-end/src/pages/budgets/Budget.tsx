import { useEffect, useState } from "react";
import CustomContent from "../../components/content/CustomContent";
import ModalBudget from "../../components/modal/modalBudget/ModalBudget";
import axios, { AxiosResponse } from "axios";
import SectionCard from "../../components/section/SectionCard";
import IBudget from "../../interfaces/IBudget";
import { useAuth } from "../../components/hooks/useAuth";
import { toast } from "react-toastify";

const Budget = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState<IBudget[]>([]);
  const { user } = useAuth();
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [initialTake, setInitialTake] = useState<number>(6);
  const { token } = useAuth();
  const [queryInput, setQueryInput] = useState<string>("");
  const [callQueryInput, setCallQueryInput] = useState<boolean>(false);
  const handleCallQueryInput = () => setCallQueryInput(true);

  const handleQueryInput = (event: string) => {
    setQueryInput(event);
  };

  const findBudgets = async (
    page: number,
    take: number = 6,
    queryInput: string
  ) => {
    const skip = (page - 1) * take;
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/budgets?queryInput=${queryInput}&skip=${skip}&take=${take}`, { headers: { Authorization: token } })
      .then((res: AxiosResponse) => {
        setData(res.data.budgets);
        setTotal(res.data.totalPages);
        setLimit(res.data.count);
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    if (user?.role.name) {
      findBudgets(page, initialTake, queryInput);
    }
  }, [user]);

  useEffect(() => {
    if (callQueryInput === true) {
      findBudgets(page, initialTake, queryInput);
      setCallQueryInput(false);
    }
  }, [queryInput, callQueryInput]);

  return (
    <CustomContent title="Orçamentos">
      <ModalBudget
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        handleQueryInput={handleQueryInput}
        handleCallQueryInput={handleCallQueryInput}
      />
      <SectionCard
        data={data}
        find={findBudgets}
        total={total}
        countLimit={limit}
        queryInput={queryInput}
      />
    </CustomContent>
  );
};

export default Budget;

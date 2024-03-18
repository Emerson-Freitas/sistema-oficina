import { Button, DatePicker } from "rsuite";
import CustomContent from "../../components/content/CustomContent";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const Report = () => {
  const [dateInit, setDateInit] = useState<string>(dayjs().subtract(30, "day").format())
  const [dateEnd, setDateEnd] = useState<string>(dayjs().format())
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = async () => {
    setLoading(true)
    await axios.post(`${import.meta.env.VITE_BASE_URL}/report/excel`, { dateInit, dateEnd }, { headers: { Authorization: token }})
      .then((res: AxiosResponse) => {
        console.log("res.data::::", res.data)
      })
      .catch((error) => {
        console.log(error.response.data.message)
      })
      .finally(() => setLoading(false))
  }

  const locale = {
    sunday: "Sun",
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    ok: "OK",
    today: "Today",
    yesterday: "Yesterday",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    formattedMonthPattern: "MMM",
    formattedDayPattern: "d",
    last7Days: "Last 7 Days",
  };

  return (
    <CustomContent title={"Relatório de Orçamentos"}>
      <div
        style={{ display: "flex", alignItems: "center", fontSize: 16, gap: 12 }}
      >
        <div>
          <p style={{ padding: 2 }}>Data Inicial</p>
          <DatePicker
            format="dd/MM/yyyy"
            value={new Date(dateInit)}
            locale={locale}
            onChange={(date) => {
              setDateInit(dayjs(date).format());
            }}
            placeholder={"DD/MM/YYYY"}
            style={{ width: 224, cursor: "pointer" }}
          />
        </div>
        <div>
          <p style={{ padding: 2 }}>Data Final</p>
          <DatePicker
            format="dd/MM/yyyy"
            value={new Date(dateEnd)}
            locale={locale}
            onChange={(date) => {
              setDateEnd(dayjs(date).format());
            }}
            placeholder={"DD/MM/YYYY"}
            style={{ width: 224, cursor: "pointer" }}
          />
        </div>
        <Button
          onClick={handleClick}
          style={{ marginTop: 26 }}
          appearance="primary"
          color="green"
          loading={loading}
        >
          Gerar Relatório
        </Button>
      </div>
    </CustomContent>
  );
};

export default Report;

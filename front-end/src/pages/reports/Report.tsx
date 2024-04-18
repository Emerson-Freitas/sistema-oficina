import { Button, DatePicker } from "rsuite";
import CustomContent from "../../components/content/CustomContent";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../components/hooks/useAuth";

const Report = () => {
  const [dateInit, setDateInit] = useState<string>(
    dayjs().subtract(30, "day").format("YYYY-MM-DD 00:00:00:000")
  );
  const [dateEnd, setDateEnd] = useState<string>(dayjs().format("YYYY-MM-DD 23:59:59:999"));
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();
  const handleClick = async () => {
    setLoading(true);
    await axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL
        }/report/excel?dateInit=${dateInit}&dateEnd=${dateEnd}`,
        {
          headers: { Authorization: token },
          responseType: "blob"
        }
      )
      .then((res: AxiosResponse) => {
        const blob = res.data;
        const fileNameHeaders= res.headers['content-disposition']
        const match = fileNameHeaders.match(/filename="([^"]+)"/);
        const fileName = match[1]
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

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
              setDateInit(dayjs(date).format("YYYY-MM-DD 00:00:00:000"));
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
              setDateEnd(dayjs(date).format("YYYY-MM-DD 23:59:59:999"));
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
          type="submit"
        >
          Gerar Relatório
        </Button>
      </div>
    </CustomContent>
  );
};

export default Report;

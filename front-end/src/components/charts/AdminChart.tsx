import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
    series: any
    categories: string[]
}

const AdminChart = ({ series, categories }: Props) => {
    const [endDate] = useState(dayjs().format('DD/MM/YYYY'))
    const [initDate] = useState(dayjs().subtract(1, "year").format('DD/MM/YYYY'))
    
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                id: "grafico-anual",
                type: 'bar',
                width: "100%"
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            colors: ["#FFD700", "#3CB371", "#FF6347"],
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                // colors: ['transparent']
            },
            xaxis: {
                categories: []
            },
            yaxis: {
                title: {
                    text: 'Orçamentos'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return + val + " Orçamentos"
                    }
                }
            }
        }
    });

    useEffect(() => {
        setChartData((prevState: any) => ({
            ...prevState,
            options: {
                ...prevState.options,
                xaxis: {
                    categories: categories
                }
            },
            series: series
        }));
    }, [categories, series]);

    return (
        <div>
            <h3 style={{ marginLeft: 20 }}>Gráfico Anual: De {initDate} até {endDate}</h3>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={"100%"} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default AdminChart;

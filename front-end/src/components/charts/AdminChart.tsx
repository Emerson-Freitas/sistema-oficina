import dayjs from 'dayjs';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const AdminChart = () => {
    const [initDate] = useState(dayjs().format('DD/MM/YYYY'))
    const [endDate] = useState(dayjs().subtract(1, "year").format('DD/MM/YYYY'))

    const [chartData, setChartData] = useState({
        series: [{
            name: 'Aceitos',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Pendentes',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Rejeitados',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        options: {
            chart: {
                type: 'bar',
                width: "100%"
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'],
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
                    formatter: function (val: string | number) {
                        return + val + " Orçamentos"
                    }
                }
            }
        }
    });

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

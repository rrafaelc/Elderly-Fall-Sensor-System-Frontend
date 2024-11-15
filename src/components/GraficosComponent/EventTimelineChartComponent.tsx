import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { SensorData } from "pages/Dashboard";

interface Props {
  sensorData: SensorData[];
  filterEventType?: string | null;
}

const EventTimelineChartComponent = ({
  sensorData,
  filterEventType = null,
}: Props) => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const prevSensorData = React.useRef<SensorData[]>([]);

  useEffect(() => {
    if (
      JSON.stringify(sensorData) !== JSON.stringify(prevSensorData.current)
    ) {
      prevSensorData.current = sensorData;

      try {
        const eventsByMonth = sensorData.reduce(
          (acc: { [key: string]: number }, event: SensorData) => {
            const date = new Date(event.updated_at);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

            if (!filterEventType || event.event_type === filterEventType) {
              acc[monthKey] = (acc[monthKey] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        const chartLabels = Object.keys(eventsByMonth).sort();
        const chartData = chartLabels.map((month) => eventsByMonth[month]);

        setLabels(chartLabels);
        setData(chartData);
      } catch {
        toast.error("Erro ao processar os eventos.");
      }
    }
  }, [sensorData, filterEventType]);

  return (
    <Box
      border="1px solid #ddd"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      width={["100%", "70%", "50%", "400px"]}
      maxWidth="500px"
      height={["70%", "400px", "400px"]}
      padding="4"
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactApexChart
        type="bar"
        height={350}
        width="100%"
        series={[
          {
            name: "Quantidade de Eventos",
            data: data,
          },
        ]}
        options={{
          chart: {
            type: "bar",
            height: 350,
            toolbar: { show: true },
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              dataLabels: { position: "top" },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (val: number) => val.toString(),
            offsetY: -20,
            style: { fontSize: "12px", colors: ["#304758"] },
          },
          xaxis: {
            categories: labels,
            title: { text: "Meses" },
          },
          yaxis: {
            title: { text: "Quantidade de Eventos" },
          },
          title: {
            text: "Linha do Tempo de Eventos",
            align: "center",
          },
          legend: { show: true },
        }}
      />
    </Box>
  );
};

export default EventTimelineChartComponent;

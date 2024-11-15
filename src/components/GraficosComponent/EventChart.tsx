import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { EventType, SensorData } from "pages/Dashboard";

interface Props {
  sensorData: SensorData[];
}

const EventChartComponent = ({ sensorData }: Props) => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const prevSensorData = useRef<SensorData[]>([]); // Armazena os dados anteriores para comparação.

  const formatEventType = (eventType: EventType) => {
    switch (eventType) {
      case "queda":
        return "Queda";
      case "emergencia":
        return "Botão SOS";
      default:
        return eventType;
    }
  };

  useEffect(() => {
    // Verifica se os dados mudaram antes de atualizar o estado.
    if (
      JSON.stringify(sensorData) !== JSON.stringify(prevSensorData.current)
    ) {
      prevSensorData.current = sensorData; // Atualiza os dados anteriores.

      try {
        const eventCounts: Record<EventType, number> = {
          queda: 0,
          emergencia: 0,
        };
        sensorData.forEach((sqlsensor) => {
          eventCounts[sqlsensor.event_type] =
            (eventCounts[sqlsensor.event_type] || 0) + 1;
        });

        const chartLabels = Object.keys(eventCounts).map((eventType) =>
        `${formatEventType(eventType as EventType)} (${eventCounts[eventType as EventType]})`
      );

        const chartData = Object.values(eventCounts);

        setLabels(chartLabels);
        setData(chartData);
      } catch {
        toast.error("Erro ao processar os eventos.");
      }
    }
  }, [sensorData]);

  useEffect(() => {
    const options = {
      chart: {
        type: "donut",
        width: "100%",
        height: "100%",
      },
      series: data,
      labels: labels,
      title: {
        text: "Quantidade de Eventos",
        align: "left",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data, labels]); // Atualiza o gráfico somente quando `data` ou `labels` mudarem.

  return (
    <Box
      border="1px solid #ddd"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      width={["100%", "70%", "50%", "400px"]}
      maxWidth="500px"
      height={["300px", "400px", "300px"]}
      padding="4"
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default EventChartComponent;

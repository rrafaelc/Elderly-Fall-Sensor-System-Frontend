import React, { useEffect, useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { EventType, SensorData } from "pages/Dashboard";

interface Props {
  sensorData: SensorData[];
}

const EventChartComponent = ({ sensorData }: Props) => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const prevSensorData = useRef<SensorData[]>([]);

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
    if (
      JSON.stringify(sensorData) !== JSON.stringify(prevSensorData.current)
    ) {
      prevSensorData.current = sensorData;

      try {
        const eventCounts: Record<EventType, number> = {
          queda: 0,
          emergencia: 0,
        };

        sensorData.forEach((sqlsensor) => {
          eventCounts[sqlsensor.event_type] =
            (eventCounts[sqlsensor.event_type] || 0) + 1;
        });

        const labels = Object.keys(eventCounts).map((eventType) =>
          `${formatEventType(eventType as EventType)} (${eventCounts[eventType as EventType]})`
        );

        const data = Object.values(eventCounts);

        setChartLabels(labels);
        setChartData(data);
      } catch {
        toast.error("Erro ao processar os eventos.");
      }
    }
  }, [sensorData]);

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
      <ReactApexChart
        type="donut"
        width="100%"
        height="100%"
        series={chartData}
        options={{
          chart: {
            type: "donut",
            width: "100%",
            height: "100%",
          },
          labels: chartLabels,
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
        }}
      />
    </Box>
  );
};

export default EventChartComponent;

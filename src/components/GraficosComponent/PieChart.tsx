import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { SensorData } from "pages/Dashboard";

interface Props {
  sensorData: SensorData[];
}

const ChartComponent = ({ sensorData }: Props) => {
  const [fallCount, setFallCount] = useState<number>(0);
  const [impactCount, setImpactCount] = useState<number>(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const prevSensorData = useRef<SensorData[]>([]); // Armazena os dados anteriores para comparação.

  useEffect(() => {
    // Verifica se os dados mudaram antes de atualizar os contadores.
    if (
      JSON.stringify(sensorData) !== JSON.stringify(prevSensorData.current)
    ) {
      prevSensorData.current = sensorData; // Atualiza os dados anteriores.

      try {
        setFallCount(sensorData.filter((item) => item.is_fall).length);
        setImpactCount(sensorData.filter((item) => item.is_impact).length);
      } catch {
        toast.error("Erro ao contar as quedas");
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
      series: [fallCount, impactCount],
      labels: ["Quedas", "Impactos"],
      colors: ["#FF1654", "#247BA0"],
      title: {
        text: "Quantidade de Quedas e Impactos",
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
  }, [fallCount, impactCount]); // Apenas atualiza o gráfico quando os contadores mudarem.

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

export default ChartComponent;

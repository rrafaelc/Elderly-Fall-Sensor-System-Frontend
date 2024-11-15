import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { SensorData } from "pages/Dashboard";

interface Props {
  sensorData: SensorData[];
}

const FallChart = ({ sensorData }: Props) => {
  const [fallCount, setFallCount] = useState<number>(0);
  const [impactCount, setImpactCount] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sensorData.length) {
      try {
        const fallCount = sensorData.filter((item) => item.is_fall).length;
        const impactCount = sensorData.filter((item) => item.is_impact).length;

        setFallCount(fallCount);
        setImpactCount(impactCount);
        setLabels([
          `Quedas (${fallCount})`,
          `Impactos (${impactCount})`
        ]);
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
      labels: labels,
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

export default FallChart;

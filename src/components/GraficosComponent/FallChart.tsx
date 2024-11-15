import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
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

  useEffect(() => {
    if (sensorData.length) {
      try {
        const fallCount = sensorData.filter((item) => item.is_fall).length;
        const impactCount = sensorData.filter((item) => item.is_impact).length;

        setFallCount(fallCount);
        setImpactCount(impactCount);
        setLabels([
          `Quedas (${fallCount})`,
          `Impactos (${impactCount})`,
        ]);
      } catch {
        toast.error("Erro ao contar as quedas");
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
        width={400}
        height="100%"
        series={[fallCount, impactCount]}
        options={{
          chart: {
            type: "donut",
            width: "100%",
            height: "100%",
          },
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
        }}
      />
    </Box>
  );
};

export default FallChart;

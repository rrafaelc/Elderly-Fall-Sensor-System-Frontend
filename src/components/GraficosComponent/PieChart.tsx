import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  is_fall: boolean;
  is_impact: boolean;
}

const ChartComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [fallCount, setFallCount] = useState<number>(0);
  const [impactCount, setImpactCount] = useState<number>(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchData = async () => {
      try {
        const response = await axios.get<SensorData[]>(`${host}/v1/sqlsensor`, config);

        const fallEvents = response.data.filter(item => item.is_fall).length;
        const impactEvents = response.data.filter(item => item.is_impact).length;

        setFallCount(fallEvents);
        setImpactCount(impactEvents);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (fallCount > 0 || impactCount > 0) {
      const options = {
        chart: {
          type: 'pie',
          width: '100%',
          height: '100%',
        },
        series: [fallCount, impactCount],
        labels: ['Quedas', 'Impactos'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
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
    }
  }, [fallCount, impactCount]);

  return (
    <Box
      border="1px solid #ddd"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      width={["100%", "70%", "50%", "100%"]}
      maxWidth="500px"
      height={["300px", "400px", "327px"]}
      padding="4"
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default ChartComponent;

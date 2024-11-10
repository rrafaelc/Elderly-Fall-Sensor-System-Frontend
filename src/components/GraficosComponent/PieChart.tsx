import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  is_fall: boolean;
  is_impact: boolean;
}

const ChartComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [fallCount, setFallCount] = useState<number>(0);
  const [impactCount, setImpactCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<SensorData[]>(`${host}/v1/sqlsensor`, config);

        const fallEvents = response.data.filter(item => item.is_fall).length;
        const impactEvents = response.data.filter(item => item.is_impact).length;

        setFallCount(fallEvents);
        setImpactCount(impactEvents);
        setLoading(false); // Define como false após receber dados, mesmo que vazios
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const options = {
        chart: {
          type: 'donut',
          width: '100%',
          height: '100%',
        },
        series: [fallCount, impactCount],
        labels: ['Quedas', 'Impactos'],
        colors: ['#FF1654', '#247BA0'],
        title: {
          text: 'Quantidade de Quedas e Impactos',
          align: 'left',
        },
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
  }, [fallCount, impactCount, loading]);

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
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      )}
    </Box>
  );
};

export default ChartComponent;

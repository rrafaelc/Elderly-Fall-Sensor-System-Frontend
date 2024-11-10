import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';


interface SensorData {
  id: number;
  event_type: string;
}

const EventChartComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
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

        const eventCounts: { [key: string]: number } = {};
        response.data.forEach(sqlsensor => {
          eventCounts[sqlsensor.event_type] = (eventCounts[sqlsensor.event_type] || 0) + 1;
        });

        const chartLabels = Object.keys(eventCounts);
        const chartData = Object.values(eventCounts);

        setLabels(chartLabels);
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
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
        series: data,
        labels: labels,
        title: {
          text: 'Quantidade de Eventos',
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
  }, [data, labels, loading]);

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

export default EventChartComponent;

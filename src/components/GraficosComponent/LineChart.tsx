import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  event_type: string;
  is_fall: boolean;
  is_impact: boolean;
}

const EventChartComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<SensorData[]>(`${host}/v1/sqlsensor`, config);

        const eventCounts: { [key: string]: { falls: number; impacts: number } } = {};
        response.data.forEach((sensor) => {
          if (!eventCounts[sensor.event_type]) {
            eventCounts[sensor.event_type] = { falls: 0, impacts: 0 };
          }
          if (sensor.is_fall) eventCounts[sensor.event_type].falls++;
          if (sensor.is_impact) eventCounts[sensor.event_type].impacts++;
        });

        const chartLabels = Object.keys(eventCounts);
        const fallsData = chartLabels.map((label) => eventCounts[label].falls);
        const impactsData = chartLabels.map((label) => eventCounts[label].impacts);

        setLabels(chartLabels);
        setSeriesData([
          { name: 'Quedas', type: 'column', data: fallsData },
          { name: 'Impactos', type: 'line', data: impactsData },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      height: 350,
      type: 'line' as const,
    },
    stroke: {
      width: [0, 4],
    },
    colors: ['#FF5733', '#33FF57'],
    title: {
      text: 'Eventos de Quedas e Impactos',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: labels,
    yaxis: [
      {
        title: {
          text: 'Quedas',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Impactos',
        },
      },
    ],
  };

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
        <ReactApexChart options={chartOptions} series={seriesData} type="line" height={350} />
      )}
    </Box>
  );
};

export default EventChartComponent;

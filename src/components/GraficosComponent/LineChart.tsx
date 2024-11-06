import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  updated_at: string; // Usar updated_at como timestamp
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
}

const LineChartComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchData = async () => {
      try {
        const response = await axios.get<SensorData[]>(`${host}/v1/sqlsensor`, config);
        setSensorData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sensorData.length > 0) {
      const timestamps = sensorData.map(item => new Date(item.updated_at).toISOString().slice(11, 19)); // Formato HH:MM:SS

      const series = [
        {
          name: 'ax',
          data: sensorData.map(item => item.ax),
        },
        {
          name: 'ay',
          data: sensorData.map(item => item.ay),
        },
        {
          name: 'az',
          data: sensorData.map(item => item.az),
        },
        {
          name: 'gx',
          data: sensorData.map(item => item.gx),
        },
        {
          name: 'gy',
          data: sensorData.map(item => item.gy),
        },
        {
          name: 'gz',
          data: sensorData.map(item => item.gz),
        },
      ];

      const options = {
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: true,
          },
        },
        title: {
          text: 'Dados de Sensores (Aceleração e Giroscópio)',
          align: 'left',
        },
        xaxis: {
          categories: timestamps,
          title: {
            text: 'Tempo',
          },
        },
        yaxis: {
          title: {
            text: 'Valores dos Sensores',
          },
        },
        series: series,
        legend: {
          position: 'top',
          horizontalAlign: 'center',
        },
        colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0', '#FF66C3'],
        tooltip: {
          shared: true,
          intersect: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '100%',
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
  }, [sensorData]);

  return (
    <Box
      border="1px solid #ddd"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      width={["100%", "70%", "50%", "600px"]}
      maxWidth="800px"
      height={["400px", "400px", "500px"]}
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

export default LineChartComponent;

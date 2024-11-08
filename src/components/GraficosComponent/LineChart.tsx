import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  updated_at: string;
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
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchData = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const response = await axios.get<SensorData[]>(`${host}/v1/sqlsensor`, config);
        setSensorData(response.data);
        setLoading(false); // Define como false após o carregamento dos dados
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false); // Define como false caso haja erro
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && sensorData.length > 0) {
      const timestamps = sensorData.map(item => new Date(item.updated_at).toISOString().slice(11, 19));

      const series = [
        { name: 'AX', data: sensorData.map(item => item.ax) },
        { name: 'AY', data: sensorData.map(item => item.ay) },
        { name: 'AZ', data: sensorData.map(item => item.az) },
        { name: 'GX', data: sensorData.map(item => item.gx) },
        { name: 'GY', data: sensorData.map(item => item.gy) },
        { name: 'GZ', data: sensorData.map(item => item.gz) },
      ];

      const options = {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: true,
          },
        },
        stroke: {
          curve: 'smooth', // Configuração para spline
          width: 2,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0.4,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        markers: {
          size: 4,
          colors: ['#FF4560'],
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: { size: 6 },
          discrete: sensorData.map((item, index) => ({
            seriesIndex: 0,
            dataPointIndex: index,
            fillColor: item.ax > 10 ? '#FF4560' : '#00E396',
          })),
        },
        title: { text: 'Monitoramento de Sensores (Aceleração e Giroscópio)', align: 'left' },
        xaxis: { categories: timestamps, title: { text: 'Tempo' } },
        yaxis: {
          title: { text: 'Valores dos Sensores' },
          min: (min: number) => min - 5,
          max: (max: number) => max + 5,
        },
        series: series,
        legend: { position: 'top', horizontalAlign: 'center' },
        colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0', '#FF66C3'],
        tooltip: {
          shared: true,
          intersect: false,
          y: { formatter: (val: number) => `${val.toFixed(2)} unidades` },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [sensorData, loading]);

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
      {loading ? (
        <Spinner size="xl" /> // Exibe o spinner enquanto está carregando
      ) : (
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      )}
    </Box>
  );
};

export default LineChartComponent;

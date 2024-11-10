import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  id: number;
  event_type: string;
  updated_at: string;
}

const EventTimelineChartComponent = ({ filterEventType = null }) => {
  const host = import.meta.env.VITE_API_HOST;
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  // Função para buscar e processar os dados
  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await axios.get(`${host}/v1/sqlsensor`, config);

      const eventsByMonth = response.data.reduce((acc: { [key: string]: number }, event: SensorData) => {
        const date = new Date(event.updated_at);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!filterEventType || event.event_type === filterEventType) {
          acc[monthKey] = (acc[monthKey] || 0) + 1;
        }
        return acc;
      }, {});

      const chartLabels = Object.keys(eventsByMonth).sort();
      const chartData = chartLabels.map(month => eventsByMonth[month]);

      setLabels(chartLabels);
      setData(chartData);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
      setLoading(false);
    }
  };

  // Opções do gráfico com ApexCharts
  useEffect(() => {
    if (!loading && chartRef.current) {
      const chartOptions = {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: { show: true },
        },
        series: [{ name: 'Quantidade de Eventos', data: data }],
        plotOptions: {
          bar: {
            borderRadius: 4,
            dataLabels: { position: 'top' }, // Exibe rótulos no topo das colunas
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number) => val.toString(),
          offsetY: -20,
          style: { fontSize: '12px', colors: ['#304758'] },
        },
        xaxis: {
          categories: labels,
          title: { text: 'Meses' },
        },
        yaxis: {
          title: { text: 'Quantidade de Eventos' },
        },
        title: {
          text: 'Linha do Tempo de Eventos',
          align: 'center',
        },
        legend: { show: true },
      };

      const chart = new ApexCharts(chartRef.current, chartOptions);
      chart.render();
      return () => chart.destroy();
    }
  }, [data, labels, loading]);

  useEffect(() => {
    fetchData();
  }, [filterEventType]);

  return (
    <Box
      border="1px solid #ddd"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      width={["100%", "70%", "50%", "700px"]}
      maxWidth="500px"
      height={["300px", "400px", "500px"]}
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

export default EventTimelineChartComponent;

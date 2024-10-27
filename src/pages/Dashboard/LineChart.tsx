import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@chakra-ui/react';

interface TrendData {
  id: number;
  name: string;
}

const LineChart = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [data, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Função para buscar dados do backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/user`);
        const result: TrendData[] = await response.json();

        // Define os dados para o gráfico
        const chartData = result.map(user => user.id);
        const chartCategories = result.map(user => user.name);
        setData(chartData);
        setCategories(chartCategories);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && categories.length > 0) {
      // Configuração do gráfico
      const options = {
        series: [
          {
            name: 'Desktops',
            data: data,
          },
        ],
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Quedas em tempo real',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: categories,
        },
      };

      // Cria ou atualiza o gráfico
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Limpeza ao desmontar para evitar vazamentos de memória
      return () => {
        chart.destroy();
      };
    }
  }, [data, categories]);

  return (
    <Box
      border="1px solid #ddd"
      borderRadius="8px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      bg="white"
      width={["100%", "70%", "50%", "100%"]}
      maxWidth="600px"
      height={["327px", "400px", "327px"]}
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

export default LineChart;

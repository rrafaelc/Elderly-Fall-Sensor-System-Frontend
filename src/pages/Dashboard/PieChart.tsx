import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@chakra-ui/react';

interface User {
  id: number;
  name: string;
}

const ChartComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Função para buscar dados do backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/user`);
        const result: User[] = await response.json();

        // Extrair dados e categorias usando map
        const chartData = result.map(user => user.id);
        const chartLabels = result.map(user => user.name);

        setData(chartData);
        setLabels(chartLabels);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && labels.length > 0) {
      // Configuração do gráfico
      const options = {
        chart: {
          type: 'pie',
          width: '100%',
          height: '100%',
        },
        series: data,
        labels: labels,
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

      // Criar ou atualizar o gráfico
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Limpeza ao desmontar para evitar vazamentos de memória
      return () => {
        chart.destroy();
      };
    }
  }, [data, labels]);

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

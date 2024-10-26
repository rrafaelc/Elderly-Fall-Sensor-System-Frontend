import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@chakra-ui/react';

interface User {
  id: number;
  name: string;
}

const ChartComponent = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Função para buscar dados do backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users');
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
      borderRadius="8px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      bg="white"
      position="fixed"
      bottom={["20px", "30px", "40px"]}
      right={["10px", "20px", "30px"]}
      width={["90%", "70%", "50%", "40%"]}
      maxWidth="500px"
      height={["300px", "400px", "400px"]}
      padding="4"
      display="flex"
      justifyContent="center"
      alignItems="center"
      top="130px"

    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default ChartComponent;

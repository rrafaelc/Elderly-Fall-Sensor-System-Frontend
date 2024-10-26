import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@chakra-ui/react';

// Defina a interface para os dados dos usuários retornados pela API
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
        const response = await fetch('http://localhost:8000/api/users'); // URL da API Laravel
        const result: User[] = await response.json();

        // Extrair dados e categorias usando map
        const chartData = result.map(user => user.id); // Usando 'id' como valor
        const chartLabels = result.map(user => user.name); // Usando 'name' como rótulo

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
          width: '100%', // Largura responsiva
          height: '100%', // Altura responsiva
        },
        series: data, // Usa os dados do estado
        labels: labels, // Usa os rótulos do estado
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
      position="fixed" // Usa posição fixa para manter no canto direito
      bottom={["20px", "30px", "40px"]} // Valor responsivo para espaçamento inferior
      right={["10px", "20px", "30px"]} // Valor responsivo para espaçamento à direita
      width={["90%", "70%", "50%", "40%"]} // Largura responsiva
      maxWidth="600px"
      height={["300px", "400px", "500px"]} // Altura responsiva
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

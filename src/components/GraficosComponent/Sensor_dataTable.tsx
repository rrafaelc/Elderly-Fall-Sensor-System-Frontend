import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box, Heading } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  id: number;
  event_type: string;
  is_fall: boolean;
  is_impact: boolean;
  updated_at: string;
}

export const SensorDataTable = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [sensor, setSensorName] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/v1/sqlsensor`, config);
        setSensorName(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para formatar o campo `updated_at` como uma data legível
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  };

  return (
    <Box
      width={["100%", "70%", "50%", "100%"]}
      maxWidth={{ base: "500px", md: "500px", lg: "1000px" }}
      height={["300px", "400px", "327px"]}
      padding="4"
      bg="white"
      boxShadow="md"
      borderRadius="md"
      overflowY="auto"
      overflowX="auto"
      margin="auto"
      border="1px solid #ddd"
    >
      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : (
        <Box>
          <Heading fontSize="lg" textAlign="center" mb="4">Histórico de Quedas</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Evento</Th>
                  <Th>Queda?</Th>
                  <Th>Impacto?</Th>
                  <Th>Status</Th>
                  <Th>Horário</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sensor.map((sensorData) => (
                  <Tr key={sensorData.id}>
                    <Td>{sensorData.event_type}</Td>
                    <Td>{sensorData.is_fall ? 'Sim' : 'Não'}</Td>
                    <Td>{sensorData.is_impact ? 'Sim' : 'Não'}</Td>
                    <Td>Enviado no Whatsapp</Td>
                    <Td>{formatDate(sensorData.updated_at)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default SensorDataTable;

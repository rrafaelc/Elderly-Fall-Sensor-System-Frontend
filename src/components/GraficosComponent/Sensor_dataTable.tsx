import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box } from '@chakra-ui/react';
import axios from 'axios';

interface Sensor_Data {
  id: number;
  event_type: string;
  is_fall: string;
  is_impact: string;
}
export const Sensor_dataTable = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [sensor, setSensorName] = useState<Sensor_Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${host}/v1/sqlsensor`, config);
      setSensorName(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <Box
      width={["100%", "70%", "50%", "100%"]}
      maxWidth={{base:"500px", md:"500px", lg:"1000px"}}
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
        <TableContainer>
          <Table variant="striped" colorScheme="blue">
          <caption className='font-bold'>Historico de Quedas</caption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Evento</Th>
                <Th>Queda?</Th>
                <Th>Impacto?</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sensor.map((sensor) => (
                <Tr key={sensor.id}>
                  <Td>{sensor.id}</Td>
                  <Td>{sensor.event_type}</Td>
                  <Td>{sensor.is_fall}</Td>
                  <Td>{sensor.is_impact}</Td>
                  <Td>Enviado no Whatsapp</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Sensor_dataTable;

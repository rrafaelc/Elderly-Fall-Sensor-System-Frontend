import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  is_fall: boolean;
  is_impact: boolean;
}

const CardComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [fallCount, setFallCount] = useState<number>(0);
  const [sosCount, setSosCount] = useState<number>(0);
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

        const fallEvents = response.data.filter(item => item.is_fall).length;
        const sosEvents = response.data.filter(item => item.is_impact).length;

        setFallCount(fallEvents);
        setSosCount(sosEvents);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  return (
    <Box display="flex" justifyContent="space-around" width="100%" padding="4">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Box
            bgGradient="linear(to-r, pink.400, red.400)"
            borderRadius="md"
            width="150px"
            height="100px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="md"
          >
            <Text fontSize="xl" color="white">{fallCount}</Text>
            <Text fontSize="md" color="white">Quedas</Text>
          </Box>
          <Box
            bgGradient="linear(to-r, teal.400, blue.400)"
            borderRadius="md"
            width="150px"
            height="100px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="md"
            ml={{base: "4", md: "0"}}
          >
            <Text fontSize="xl" color="white">{sosCount}</Text>
            <Text fontSize="md" color="white">Impactos</Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CardComponent;

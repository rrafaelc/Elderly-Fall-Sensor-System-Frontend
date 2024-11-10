import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

interface SensorData {
  id: number;
  event_type: string;
}

const EventCardsComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [eventCounts, setEventCounts] = useState<{ [key: string]: number }>({});
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

        const counts: { [key: string]: number } = {};
        response.data.forEach(sqlsensor => {
          counts[sqlsensor.event_type] = (counts[sqlsensor.event_type] || 0) + 1;
        });

        setEventCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box padding="4">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing="170">
          {Object.entries(eventCounts).map(([eventType, count]) => (
            <Box
              key={eventType}
              bgGradient="linear(to-r, teal.400, blue.400)"
              borderRadius="md"
              width="150px"
              height="100px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="md"
            >
              <Text fontSize="xl" color="white">{count}</Text>
              <Text fontSize="md" color="white">{eventType}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );

};

export default EventCardsComponent;

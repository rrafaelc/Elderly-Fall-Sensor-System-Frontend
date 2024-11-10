import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Spinner } from '@chakra-ui/react';
import { FaChartLine, FaClock } from 'react-icons/fa';
import axios from 'axios';

interface SensorData {
  id: number;
  event_type: string;
  updated_at: string;
}

const CardTimeline = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [monthlyAverage, setMonthlyAverage] = useState<number>(0);
  const [lastEvent, setLastEvent] = useState<SensorData | null>(null);
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

        const eventsByMonth: { [key: string]: number } = {};
        response.data.forEach(event => {
          const date = new Date(event.updated_at);
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
          eventsByMonth[monthKey] = (eventsByMonth[monthKey] || 0) + 1;
        });

        const totalEvents = response.data.length;
        const distinctMonths = Object.keys(eventsByMonth).length;
        setMonthlyAverage(distinctMonths > 0 ? totalEvents / distinctMonths : 0);

        const mostRecentEvent = response.data.reduce((latest, event) =>
          new Date(event.updated_at) > new Date(latest.updated_at) ? event : latest
        );
        setLastEvent(mostRecentEvent);

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
        <Flex
          direction="row"
          gap="4"
          justify="center"
        >
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
          >
            <Text fontSize="2xl" color="white">{monthlyAverage.toFixed(2)}</Text>
            <Text fontSize="md" color="white">
              <FaChartLine style={{ display: 'inline', marginRight: '4px' }} />
              Média Mensal
            </Text>
          </Box>

          <Box
            bgGradient="linear(to-r, orange.400, red.400)"
            borderRadius="md"
            width="150px"
            height="100px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="md"
          >
            {lastEvent ? (
              <>
                <Text fontSize="2xl" color="white">{lastEvent.event_type}</Text>
                <Text fontSize="sm" color="white">
                  <FaClock style={{ display: 'inline', marginRight: '4px' }} />
                  {new Date(lastEvent.updated_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                </Text>
              </>
            ) : (
              <Text fontSize="sm" color="white">Nenhum evento registrado</Text>
            )}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default CardTimeline;

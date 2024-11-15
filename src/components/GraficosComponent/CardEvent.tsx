import { useEffect, useRef, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { EventType, SensorData } from "pages/Dashboard";

interface Props {
  sensorData: SensorData[];
}

const EventCardsComponent = ({ sensorData }: Props) => {
  const [eventCounts, setEventCounts] = useState<Record<EventType, number>>({
    queda: 0,
    emergencia: 0,
  });

  const prevSensorData = useRef<SensorData[]>([]); // Armazena os dados anteriores.

  const formatEventType = (eventType: EventType) => {
    switch (eventType) {
      case "queda":
        return "Queda";
      case "emergencia":
        return "Emergência";
      default:
        return eventType;
    }
  };

  useEffect(() => {
    // Verifica se `sensorData` mudou em relação aos dados anteriores.
    if (
      JSON.stringify(sensorData) !== JSON.stringify(prevSensorData.current)
    ) {
      prevSensorData.current = sensorData; // Atualiza os dados anteriores.

      try {
        const counts: Record<EventType, number> = { queda: 0, emergencia: 0 };
        sensorData.forEach((sensor) => {
          counts[sensor.event_type] =
            (counts[sensor.event_type] || 0) + 1;
        });

        setEventCounts(counts);
      } catch {
        toast.error("Erro ao contar os eventos.");
      }
    }
  }, [sensorData]);

  return (
    <Box padding="4">
      <Flex direction="row" gap="4" justify="center">
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
            ml={{ base: "0", md: "1" }}
          >
            <Text fontSize="xl" color="white">
              {count}
            </Text>
            <Text fontSize="md" color="white">
              {formatEventType(eventType as EventType)}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default EventCardsComponent;

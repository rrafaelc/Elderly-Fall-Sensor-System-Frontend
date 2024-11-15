import { useEffect, useRef, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { FaChartLine, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import { SensorData } from "pages/Dashboard";

interface Props {
  sensorData: SensorData[];
}

const CardTimeline = ({ sensorData }: Props) => {
  const [monthlyAverage, setMonthlyAverage] = useState<number>(0);
  const [lastEvent, setLastEvent] = useState<SensorData | null>(null);

  const prevSensorData = useRef<SensorData[]>([]); // Dados anteriores.

  useEffect(() => {
    if (
      JSON.stringify(sensorData) !== JSON.stringify(prevSensorData.current)
    ) {
      prevSensorData.current = sensorData; // Atualiza dados anteriores.

      try {
        if (sensorData.length > 0) {
          // Cálculo da média mensal
          const eventsByMonth: Record<string, number> = {};
          sensorData.forEach((event) => {
            const date = new Date(event.updated_at);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            eventsByMonth[monthKey] = (eventsByMonth[monthKey] || 0) + 1;
          });

          const totalEvents = sensorData.length;
          const distinctMonths = Object.keys(eventsByMonth).length;
          setMonthlyAverage(
            distinctMonths > 0 ? totalEvents / distinctMonths : 0
          );

          // Identificação do evento mais recente
          const mostRecentEvent = sensorData.reduce((latest, event) =>
            new Date(event.updated_at) > new Date(latest.updated_at)
              ? event
              : latest
          );
          setLastEvent(mostRecentEvent);
        } else {
          setMonthlyAverage(0);
          setLastEvent(null);
        }
      } catch {
        toast.error("Erro ao processar os dados.");
      }
    }
  }, [sensorData]);

  return (
    <Box padding="4">
      <Flex direction="row" gap="4" justify="center">
        {/* Cartão de Média Mensal */}
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
          <Text fontSize="2xl" color="white">
            {monthlyAverage}
          </Text>
          <Text fontSize="md" color="white">
            <FaChartLine style={{ display: "inline", marginRight: "4px" }} />
            Média Mensal
          </Text>
        </Box>

        {/* Cartão do Último Evento */}
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
              <Text fontSize="2xl" color="white">
                {lastEvent.event_type === "queda" ? "Queda" : "Emergência"}
              </Text>
              <Text fontSize="sm" color="white">
                <FaClock style={{ display: "inline", marginRight: "4px" }} />
                {new Date(lastEvent.updated_at).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Text>
            </>
          ) : (
            <Text fontSize="sm" color="white" align="center">
              Nenhum evento registrado
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CardTimeline;

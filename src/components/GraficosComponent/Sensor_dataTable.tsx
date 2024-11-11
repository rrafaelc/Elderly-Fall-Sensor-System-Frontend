import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
} from "@chakra-ui/react";
import { SensorData } from "pages/Dashboard";
interface Props {
  sensorData: SensorData[];
}

export const SensorDataTable = ({ sensorData }: Props) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const sortedSensorData = [...sensorData].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

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

        <Box>
          <Heading fontSize="lg" textAlign="center" mb="4">
            Histórico de Quedas
          </Heading>
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
                {sortedSensorData.map((sensor) => (
                  <Tr key={sensor.id}>
                    <Td>
                      {sensor.event_type === "queda" ? "Queda" : "Emergência"}
                    </Td>
                    <Td>{sensor.is_fall ? "Sim" : "Não"}</Td>
                    <Td>{sensor.is_impact ? "Sim" : "Não"}</Td>
                    <Td>Enviado no Whatsapp</Td>
                    <Td>{formatDate(sensor.created_at)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

    </Box>
  );
};

export default SensorDataTable;

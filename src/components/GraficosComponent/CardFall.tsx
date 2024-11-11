import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { SensorData } from "pages/Dashboard";
import { toast } from "react-toastify";interface Props {
  sensorData: SensorData[];
  loading: boolean;
}

const CardComponent = ({ sensorData, loading }: Props) => {
  const [fallCount, setFallCount] = useState<number>(0);
  const [sosCount, setSosCount] = useState<number>(0);

  useEffect(() => {
    if (sensorData.length) {
      try {
        setFallCount(sensorData.filter((item) => item.is_fall).length);
        setSosCount(sensorData.filter((item) => item.is_impact).length);
      } catch {
        toast.error("Erro ao contar as quedas");
      }
    }
  }, [sensorData, loading]);

  return (
    <Box display="flex" justifyContent="space-around" width="100%" padding="4">
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
        <Text fontSize="xl" color="white">
          {fallCount}
        </Text>
        <Text fontSize="md" color="white">
          Quedas
        </Text>
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
        ml={{ base: "4", md: "0" }}
      >
        <Text fontSize="xl" color="white">
          {sosCount}
        </Text>
        <Text fontSize="md" color="white">
          Impactos
        </Text>
      </Box>
    </Box>
  );
};

export default CardComponent;

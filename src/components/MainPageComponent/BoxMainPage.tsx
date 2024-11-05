import { Box,Text,HStack,Divider,VStack,Flex} from "@chakra-ui/react";

export const BoxMainPage = () => {
  return (
    <Box bg="gray.100" p="2" borderRadius="md" boxShadow="md" w={{base:"400px", md:"100%"}} h={{base:"275px", md:"100%"}}>

      <HStack spacing={5} align="center" pt="2" p="2">
        <VStack align="flex-start" maxH={{base:"200px"}} >
            <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }} >
              Detecção
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" textAlign="left">
              Sensores de movimento e impacto detectam quedas em tempo real, acionando alertas automáticos.
            </Text>
        </VStack>

        <Divider orientation="vertical"  display={{base:"none", lg:"block"}} h="80px" borderColor="gray.300" />

        <VStack align="flex-start" maxW="sm" maxH={{base:"200px"}} >
          <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
            Botão SOS
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" textAlign="left">
            Disponível para acionamento manual em caso de necessidade urgente, proporcionando uma camada extra de segurança.
          </Text>
        </VStack>


        <Divider orientation="vertical" display={{base:"none", lg:"block"}} h="80px" borderColor="gray.300" />

        <VStack align="flex-start" maxW="sm">
          <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
            Temporizador
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" textAlign="left">
            Evita alarmes falsos, aumentando a precisão dos alertas e melhorando a eficiência do sistema.
          </Text>
        </VStack>

      </HStack>
    </Box>
  );
};

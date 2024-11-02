import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { Image , Box,Text,Flex  } from "@chakra-ui/react";
import { motion } from "framer-motion";


const PaginaInicialPage = () => {
  const MotionText = motion(Text);
  const MotionImage = motion(Image);


  return(
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>

        <Box textAlign="center" mt="10" px="4">
          <Flex justify="left" align="center" gap="2">
            <MotionText
              as="h1"
              fontSize={{ base: "lg", md: "5xl" }}
              fontWeight="bold"
              color="blue.600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Segurança e Autonomia
            </MotionText>

            <MotionText
                as="h1"
                fontSize={{ base: "lg", md: "4xl" }}
                fontWeight="bold"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                para os Idosos, em Tempo Real
            </MotionText>
          </Flex>

          <Box display="flex" justifyContent="left" alignItems="center" mt="6">
            <Text
              textAlign="left"
              fontSize={{ base: "md", md: "xl" }}
              color="black"
              maxWidth="1000px"
              mt="4"
            >
              Apresentamos um sistema interativo para monitoramento e detecção de quedas,
              permitindo uma resposta rápida e eficaz. Através de um dashboard intuitivo,
              você acompanha os dados em tempo real e consulta o histórico de incidentes.
              Nossa solução tecnológica foi desenvolvida para trazer mais segurança,
              confiança e independência aos idosos e tranquilidade às famílias.
            </Text>
          </Box>
        </Box>
        <Flex direction={{ base: "column", md: "row" }} align="center" ml={{ base: "0", md: "10" }}>
        <MotionImage
            src="../../public/images/modelosensor.png"
            alt="imagem piloto"
            width={{ base: "300px", md: "500px" }}
            opacity={0.8}
            ml={{ base: "0", md: "20" }}
            mt={{ base: "4", md: "20" }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

        <Box
            bg="gray.100"
            p="4"
            borderRadius="md"
            width={{ base: "100%", md: "500px" }} // Ajuste responsivo para telas menores
            ml={{ base: "0", md: "4" }}
            mt={{ base: "4", md: "0" }}
          >
            <Text fontSize="lg" color="gray.700" fontWeight="bold">
              Funcionalidades Principais
            </Text>
            <Text fontSize="md" mt="7">
              • Detecção de Quedas
              Sensores de movimento e impacto detectam quedas em tempo real, acionando alertas automáticos.
            </Text>
            <Text fontSize="md" mt="7">
              • Botão SOS
              Disponível para acionamento manual em caso de necessidade urgente, proporcionando uma camada extra de segurança.
            </Text>
            <Text fontSize="md" mt="7">
              • Temporizador Inteligente
              Evita alarmes falsos, aumentando a precisão dos alertas e melhorando a eficiência do sistema.
            </Text>

        </Box>
      </Flex>
    </Page>
  );
};

export const Component = PaginaInicialPage;

export const ErrorBoundary = ErrorPageStrategy;

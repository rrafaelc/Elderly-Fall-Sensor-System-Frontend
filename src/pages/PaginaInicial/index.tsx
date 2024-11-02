import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { Image , Box,Text,Flex  } from "@chakra-ui/react";
import { motion } from "framer-motion";


const PaginaInicialPage = () => {
  const MotionText = motion(Text);



  return(
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <Box textAlign="center" mt="10" px="4">

        <Flex justify="left" align="center" gap="2">
          <MotionText
            as="h1"
            fontSize={{ base: "md", md: "5xl" }}
            fontWeight="bold"
            color="teal.500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Segurança e Autonomia
          </MotionText>

          <MotionText
              as="h1"
              fontSize={{ base: "md", md: "4xl" }}
              fontWeight="bold"
              color="teal.700"
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
        <Image
          src="../../public/images/modelosensor.png"
          alt="imagem piloto"
          width={{ base: "100px", md: "500px" }}
          opacity={0.8}
        />
      </Box>
    </Page>
  );
};

export const Component = PaginaInicialPage;

export const ErrorBoundary = ErrorPageStrategy;

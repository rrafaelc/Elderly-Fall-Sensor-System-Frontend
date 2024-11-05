import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { Image , Box,Text,HStack,Divider, VStack,Flex} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BoxMainPage } from "components/MainPageComponent/BoxMainPage";


const PaginaInicialPage = () => {
  const MotionText = motion(Text);
  const MotionImage = motion(Image);


  return(
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>

      <MotionText
        as="h1"
        pt={2}
        fontSize={{ base: "xl", md: "7xl" }}
        fontWeight="bold"
        color="blue.600"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        >
          Segurança e Autonomia para os Idosos, em Tempo Real
        </MotionText>

        <HStack spacing={2} align="center" pt={5}>
          <Box maxW={{ base: "90%", md: "80%", lg: "70%" }} minW={{ base: "60%", md: "400px" }}>
            <Text
            fontSize={{ base: "md", md: "xl" }}
            textAlign="left"
            mb={{ base: 4, md: 0 }}
              >
                Apresentamos um sistema interativo para monitoramento e detecção de quedas,
                permitindo uma resposta rápida e eficaz. Através de um dashboard intuitivo,
                você acompanha os dados em tempo real e consulta o histórico de incidentes.
                Nossa solução tecnológica foi desenvolvida para trazer mais segurança,
                confiança e independência aos idosos e tranquilidade às famílias.
            </Text>
          </Box>
          <MotionImage
            src="../../public/images/modelosensor.png"
            alt="imagem piloto"
            width={{ base: "200px", md: "500px" }}
            opacity={0.8}
            ml={{ base: "0", md: "20" }}
            mt={{ base: "4", md: "20" }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </HStack>

        <BoxMainPage/>

    </Page>
  );
};

export const Component = PaginaInicialPage;

export const ErrorBoundary = ErrorPageStrategy;

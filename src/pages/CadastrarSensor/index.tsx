import { Center } from "@chakra-ui/react";
import { CadastrarSensorComponent } from "components/CadastrarSensorComponent";
import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const CadastrarSensorPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <Center py={{ base: 10, md: 12 }}>
      <CadastrarSensorComponent />
      </Center>
    </Page>
  );
};

export const Component = CadastrarSensorPage;

export const ErrorBoundary = ErrorPageStrategy;

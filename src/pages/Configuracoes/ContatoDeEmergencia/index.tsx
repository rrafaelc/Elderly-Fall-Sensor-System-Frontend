import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const ContatoDeEmergenciaPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>ContatoDeEmergenciaPage</h1>
    </Page>
  );
};

export const Component = ContatoDeEmergenciaPage;

export const ErrorBoundary = ErrorPageStrategy;

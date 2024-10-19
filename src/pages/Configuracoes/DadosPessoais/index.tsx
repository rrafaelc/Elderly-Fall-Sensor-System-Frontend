import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const DadosPessoaisPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>DadosPessoaisPage</h1>
    </Page>
  );
};

export const Component = DadosPessoaisPage;

export const ErrorBoundary = ErrorPageStrategy;

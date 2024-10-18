import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const CadastrarIdosoPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>CadastrarIdosoPage</h1>
    </Page>
  );
};

export const Component = CadastrarIdosoPage;

export const ErrorBoundary = ErrorPageStrategy;

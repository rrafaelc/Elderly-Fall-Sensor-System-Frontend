import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const PaginaInicialPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>PaginaInicialPage</h1>
    </Page>
  );
};

export const Component = PaginaInicialPage;

export const ErrorBoundary = ErrorPageStrategy;

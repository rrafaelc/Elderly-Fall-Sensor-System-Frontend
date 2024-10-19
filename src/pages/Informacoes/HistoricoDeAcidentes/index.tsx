import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const HistoricoDeAcidentesPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>HistoricoDeAcidentesPage</h1>
    </Page>
  );
};

export const Component = HistoricoDeAcidentesPage;

export const ErrorBoundary = ErrorPageStrategy;

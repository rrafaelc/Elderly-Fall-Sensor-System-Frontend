import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const AlarmeENotificacoesPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>AlarmeENotificacoesPage</h1>
    </Page>
  );
};

export const Component = AlarmeENotificacoesPage;

export const ErrorBoundary = ErrorPageStrategy;

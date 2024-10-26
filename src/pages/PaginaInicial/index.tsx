import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";


const PaginaInicialPage = () => {
  return(
    <Page>
      <h1>PaginaInicial</h1>
    </Page>
  );
};

export const Component = PaginaInicialPage;

export const ErrorBoundary = ErrorPageStrategy;

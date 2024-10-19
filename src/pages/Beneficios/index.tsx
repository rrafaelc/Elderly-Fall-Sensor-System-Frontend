import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const BeneficiosPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>BeneficiosPage</h1>
    </Page>
  );
};

export const Component = BeneficiosPage;

export const ErrorBoundary = ErrorPageStrategy;

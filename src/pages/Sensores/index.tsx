import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const SensoresPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>SensoresPage</h1>
    </Page>
  );
};

export const Component = SensoresPage;

export const ErrorBoundary = ErrorPageStrategy;

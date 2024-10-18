import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const SensibilidadePage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>SensibilidadePage</h1>
    </Page>
  );
};

export const Component = SensibilidadePage;

export const ErrorBoundary = ErrorPageStrategy;

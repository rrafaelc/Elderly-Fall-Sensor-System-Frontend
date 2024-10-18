import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const SobrePage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>SobrePage</h1>
    </Page>
  );
};

export const Component = SobrePage;

export const ErrorBoundary = ErrorPageStrategy;

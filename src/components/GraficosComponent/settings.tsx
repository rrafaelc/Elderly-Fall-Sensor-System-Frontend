import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const settings = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>settings</h1>
    </Page>
  );
};

export const Component = settings;

export const ErrorBoundary = ErrorPageStrategy;

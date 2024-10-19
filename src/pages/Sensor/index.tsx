import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const SensorPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>SensorPage</h1>
    </Page>
  );
};

export const Component = SensorPage;

export const ErrorBoundary = ErrorPageStrategy;

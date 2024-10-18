import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const EmparelharComInternetPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>EmparelharComInternetPage</h1>
    </Page>
  );
};

export const Component = EmparelharComInternetPage;

export const ErrorBoundary = ErrorPageStrategy;

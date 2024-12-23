import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const SuportePage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>SuportePage</h1>
    </Page>
  );
};

export const Component = SuportePage;

export const ErrorBoundary = ErrorPageStrategy;

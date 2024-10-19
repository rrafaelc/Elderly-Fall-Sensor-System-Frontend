import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const DashboardPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>DashboardPage</h1>
    </Page>
  );
};

export const Component = DashboardPage;

export const ErrorBoundary = ErrorPageStrategy;

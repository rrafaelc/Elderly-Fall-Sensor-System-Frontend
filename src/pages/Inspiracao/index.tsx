import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

const InspiracaoPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <h1>InspiracaoPage</h1>
    </Page>
  );
};

export const Component = InspiracaoPage;

export const ErrorBoundary = ErrorPageStrategy;

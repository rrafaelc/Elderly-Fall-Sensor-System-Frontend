import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import ChartComponent from './PieChart';
import UserTable from './UserTable';

const DashboardPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <ChartComponent />
      <UserTable />
    </Page>
  );
};


export const Component = DashboardPage;

export const ErrorBoundary = ErrorPageStrategy;

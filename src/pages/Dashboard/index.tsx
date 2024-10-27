import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import ChartComponent from './PieChart';
import UserTable from './UserTable';
import SettingsCard from "./SettingsCard";
import { Flex, Box } from "@chakra-ui/react";
import LineChart from './LineChart';

const DashboardPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        gap="8"
        justify="space-between"
        align="flex-start"
      >
        <Box flex="1" maxW={{ base: "100%", md: "32%", lg: "30%" }} w="100%" mb={["4", "0"]}>
          <SettingsCard />
        </Box>
        <Box flex="1" maxW={{ base: "100%", md: "32%", lg: "30%" }} w="100%" mb={["4", "0"]}>
          <ChartComponent />
        </Box>
        <Box flex="1" maxW={{ base: "100%", md: "32%", lg: "30%" }} w="100%">
          <LineChart />
        </Box>
      </Flex>
      <Box mt="20" width="100%" display="flex" justifyContent="center">
          <UserTable />
      </Box>
    </Page>
  );
};

export const Component = DashboardPage;
export const ErrorBoundary = ErrorPageStrategy;

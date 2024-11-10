import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { Flex, Box } from "@chakra-ui/react";
import ChartComponent from '../../components/GraficosComponent/PieChart';
import { Sensor_dataTable } from '../../components/GraficosComponent/Sensor_dataTable';
import EventChartComponent from "components/GraficosComponent/EventChart";
import CardEvent from "components/GraficosComponent/CardEvent";
import CardFall from "components/GraficosComponent/CardFall";

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
          <CardFall />
          <ChartComponent />
        </Box>

        <Box flex="1" maxW={{ base: "100%", md: "32%", lg: "30%" }} w="100%" mb={["4", "0"]}>
          <CardEvent />
          <EventChartComponent />
        </Box>

      </Flex>

      <Box mt="20" width="100%" display="flex" justifyContent="center">
        <Sensor_dataTable />
      </Box>
    </Page>
  );
};

export const Component = DashboardPage;
export const ErrorBoundary = ErrorPageStrategy;

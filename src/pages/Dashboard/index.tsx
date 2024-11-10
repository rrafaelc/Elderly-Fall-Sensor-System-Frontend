import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { SimpleGrid, Box } from "@chakra-ui/react";
import ChartComponent from '../../components/GraficosComponent/PieChart';
import { Sensor_dataTable } from '../../components/GraficosComponent/Sensor_dataTable';
import EventChartComponent from "components/GraficosComponent/EventChart";
import CardEvent from "components/GraficosComponent/CardEvent";
import CardFall from "components/GraficosComponent/CardFall";

const DashboardPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={8}>
        <Box>
          <CardFall />
          <ChartComponent />
        </Box>

        <Box>
          <CardEvent />
          <EventChartComponent />
        </Box>
      </SimpleGrid>

      <Box mt="20" width="100%" display="flex" justifyContent="center">
        <Sensor_dataTable />
      </Box>

    </Page>
  );
};

export const Component = DashboardPage;
export const ErrorBoundary = ErrorPageStrategy;

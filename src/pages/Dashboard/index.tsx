import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { Flex, Box } from "@chakra-ui/react";
import LineChart from '../../components/GraficosComponent/LineChart';
import ChartComponent from '../../components/GraficosComponent/PieChart';
import { Sensor_dataTable } from '../../components/GraficosComponent/Sensor_dataTable';
import SettingsCard from "../../components/GraficosComponent/SettingsCard";
const DashboardPage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        gap="8"
        justify="center"
        align="flex-start"
      >
        <Box flex="1" maxW={{ base: "100%", md: "32%", lg: "30%" }} w="100%" mb={["4", "0"]}>
          <ChartComponent />
        </Box>
        <Box flex="1" maxW={{ base: "100%", md: "32%", lg: "30%" }} w="100%" ml={{lg:"30"}}>
          <LineChart />
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

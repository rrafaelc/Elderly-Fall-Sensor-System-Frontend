import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import ChartComponent from "../../components/GraficosComponent/PieChart";
import EventChartComponent from "components/GraficosComponent/EventChart";
import CardEvent from "components/GraficosComponent/CardEvent";
import CardFall from "components/GraficosComponent/CardFall";
import EventTimelineChartComponent from "components/GraficosComponent/EventTimelineChartComponent";
import SensorDataTable from "components/GraficosComponent/Sensor_dataTable";
import CardTimeline from "components/GraficosComponent/CardTimeline";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircleIcon } from "@chakra-ui/icons";

export type EventType = "queda" | "emergencia";
export interface SensorData {
  id: number;
  serial_number: string;
  event_type: EventType;
  is_fall: number;
  is_impact: number;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
  created_at: string;
  updated_at: string;
}

const DashboardPage = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [previousData, setPreviousData] = useState<SensorData[]>([]);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<SensorData[]>(
        `${host}/v1/sqlsensor`,
        config
      );

      if (JSON.stringify(response.data) !== JSON.stringify(previousData)) {
        setSensorData(response.data);
        setPreviousData(response.data);
      }
    } catch (error) {
      toast.error("Erro ao buscar os dados");
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  if (!sensorData.length) {
    return (
      <div>
        <Text fontSize="large" color="black" align="center">
          <div className="flex justify-center items-center gap-2">
            <span>Nenhum evento registrado</span>
            <CheckCircleIcon color="green.500" />
          </div>
        </Text>
      </div>
    );
  }

  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={8}>
        <Box>
          <CardFall sensorData={sensorData} />
          <ChartComponent sensorData={sensorData} />
        </Box>

        <Box>
          <CardEvent sensorData={sensorData} />
          <EventChartComponent sensorData={sensorData} />
        </Box>

        <Box>
          <CardTimeline sensorData={sensorData} />
          <EventTimelineChartComponent sensorData={sensorData} />
        </Box>
      </SimpleGrid>

      <Box mt="20" width="100%" display="flex" justifyContent="center">
        <SensorDataTable sensorData={sensorData} />
      </Box>
    </Page>
  );
};

export const Component = DashboardPage;
export const ErrorBoundary = ErrorPageStrategy;

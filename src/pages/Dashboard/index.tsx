import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { Flex, Box, Text } from "@chakra-ui/react";
import ChartComponent from "components/GraficosComponent/FallChart";
import EventChartComponent from "components/GraficosComponent/EventChart";
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
  const [, setLastEvent] = useState<SensorData | null>(null);
  const [inInterval, setInInterval] = useState(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async (inInterval: boolean) => {
    try {
      const response = await axios.get<SensorData[]>(
        `${host}/v1/sqlsensor`,
        config
      );

      if (JSON.stringify(response.data) !== JSON.stringify(previousData)) {
        setSensorData(response.data);
        setPreviousData(response.data);

        // Definir o último evento registrado
        const latestEvent = response.data[response.data.length - 1];
        setLastEvent(latestEvent);

        if (inInterval) {
          if (latestEvent.event_type === "emergencia") {
            toast.error(
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/sos.gif"
                  alt="Ambulância"
                  style={{ width: "30px", marginRight: "10px" }}
                />
                <span>Emergência detectada!</span>
              </div>,
              {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                hideProgressBar: false,
                icon: false
              }
            );
          } else if (latestEvent.event_type === "queda") {
            toast.info(
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Queda detectada</span>
              </div>,
              {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                hideProgressBar: false,
              }
            );
          }
        }
      }
    } catch (error) {
      toast.error("Erro ao buscar os dados");
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchData(inInterval);

    const intervalId = setInterval(() => {
      setInInterval(true);
      fetchData(true);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      setInInterval(false);
    };
  }, [previousData]);

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
      <Box p={4}> <CardTimeline sensorData={sensorData}  /> </Box>

      <Flex flexDirection={{ base: 'column', md: 'row' }} justify="space-between" align="center">

        <Box p={4} ><EventTimelineChartComponent sensorData={sensorData} /> </Box>

        <Box p={4} > <ChartComponent sensorData={sensorData} /> </Box>

        <Box p={4} > <EventChartComponent sensorData={sensorData}  /> </Box>

        </Flex>

      <Box mt="20" width="100%" display="flex" justifyContent="center">
        <SensorDataTable sensorData={sensorData} />
      </Box>

    </Page>
  );
};

export const Component = DashboardPage;
export const ErrorBoundary = ErrorPageStrategy;

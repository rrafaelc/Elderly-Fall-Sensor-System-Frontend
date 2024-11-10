import { useState, useEffect } from "react";
import { Avatar, Card, Typography, Slider, Button } from "antd";
import axios from "axios";
import { IUser } from "modules/auth/types";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";

const { Text } = Typography;

interface SensorData {
  id: number;
  name: string;
  status: number;
  serial_number: string;
  timer: number;
  last_verification: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export const SensorCard = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTemporizador, setLoadingTemporizador] =
    useState<boolean>(false);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [timerValue, setTimerValue] = useState<number>(0.5);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!) as IUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const getSensorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<SensorData>(
          `${host}/v1/device/user/${user.id}`,
          config
        );

        setSensorData(response.data);
        setTimerValue(response.data.timer);
      } catch (error) {
        toast.error("Erro ao buscar os dados");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSensorData();
  }, []);

  const handleSaveTimer = async () => {
    setLoadingTemporizador(true);
    try {
      if (!sensorData) throw new Error("Sensor não foi carregado!");

      await axios.patch<SensorData>(
        `${host}/v1/device/${sensorData.id}`,
        {
          timer: timerValue,
        },
        config
      );

      toast.success('Temporizador atualizado com sucesso!');
    } catch (error) {
      toast.error("Erro ao atualizar o temporizador");
      console.error(error);
    } finally {
      setLoadingTemporizador(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card
        loading={loading}
        cover={<img alt="example" src="images/modelosensor.png" />}
        className="min-w-[250px] max-w-[300px]"
      >
        <Card.Meta
          avatar={<Avatar src="images/arduino-logo.png" />}
          title={sensorData?.name ?? "Carregando..."}
        />
        <div className="mt-4">
          <div className="flex gap-1 flex-col">
            <Text strong>Número de Série</Text>
            {sensorData ? (
              <Text ellipsis>{sensorData?.serial_number}</Text>
            ) : (
              <Text>Carregando...</Text>
            )}
          </div>
          <div className="flex gap-1 flex-col">
            <Text strong>Nome do contato</Text>
            {sensorData ? (
              <Text ellipsis>{user.name}</Text>
            ) : (
              <Text>Carregando...</Text>
            )}
          </div>
          <div className="flex gap-1 flex-col">
            <Text strong>WhatsApp</Text>
            {sensorData ? (
              <Text
                copyable={{
                  text: user.whatsapp_number.toString(),
                  tooltips: ["Copiar", "Copiado!"],
                }}
              >
                <PatternFormat
                  format="(##) #####-####"
                  value={user.whatsapp_number}
                  displayType="text"
                />
              </Text>
            ) : (
              <Text>Carregando...</Text>
            )}
          </div>
          <div className="flex gap-1 flex-col">
            <Text strong className="!mt-6">
              Temporizador - {timerValue} minutos
            </Text>
            {sensorData ? (
              <div className="flex flex-col gap-2">
                <div className="w-full flex justify-center">
                  <Slider
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={timerValue}
                    onChange={setTimerValue}
                    marks={{ 0.5: "0.5m", 5: "5m", 10: "10m" }}
                    className="w-10/12"
                  />
                </div>
                <Button
                  type="primary"
                  loading={loadingTemporizador}
                  onClick={handleSaveTimer}
                >
                  {loadingTemporizador ? "Aguarde" : "Salvar"}
                </Button>
              </div>
            ) : (
              <Text>Carregando...</Text>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

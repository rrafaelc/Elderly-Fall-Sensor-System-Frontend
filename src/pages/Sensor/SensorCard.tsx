import { useState, useEffect } from "react";
import { Avatar, Card, Typography } from "antd";
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
  last_verification: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export const SensorCard = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [loading, setLoading] = useState<boolean>(true);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!) as IUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const getSensorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${host}/v1/device/user/${user.id}`,
          config
        );

        setSensorData(response.data);
      } catch (error) {
        toast.error("Erro ao buscar os dados");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSensorData();
  }, []);

  return (
    <div className="flex justify-center">
      <Card
        loading={loading}
        cover={<img alt="example" src="images/modelosensor.png" />}
        className="max-w-[300px]"
      >
        <Card.Meta
          avatar={<Avatar src="images/arduino-logo.png" />}
          title={sensorData?.name ?? 'Carregando...'}
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
        </div>
      </Card>
    </div>
  );
};

import { Button, Typography, Card } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";

const { Title, Text } = Typography;

export const EmparelharSensor = () => {
  const { increaseStep, loading } = useCadastrarSensor();

  return (
    <div className="flex items-center justify-center py-2">
      <Card className="w-full p-2">
        <Title level={2} className="text-center mb-6">
          Como Emparelhar o Sensor com a Internet
        </Title>

        <div className="mb-6 flex items-center">
          <WifiOutlined className="text-2xl mr-2" />
          <Text className="text-lg">
            Siga estas etapas para emparelhar seu sensor:
          </Text>
        </div>

        <div className="mb-4">
          <Title level={4}>1. Ligar o Sensor</Title>
          <Text>
            Certifique-se de que o sensor está ligado e com a bateria carregada.
          </Text>
        </div>

        <div className="mb-4">
          <Title level={4}>2. Conectar à Rede Wi-Fi</Title>
          <Text>
            Vá para as configurações do sensor e selecione a rede Wi-Fi que
            deseja conectar. Use a senha correta.
          </Text>
        </div>

        <div className="mb-4">
          <Title level={4}>3. Verificar Conexão</Title>
          <Text>
            Aguarde até que o sensor indique que está conectado à internet com
            sucesso.
          </Text>
        </div>

        <div className="flex justify-center">
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={loading}
            onClick={() => increaseStep()}
          >
            Próximo passo
          </Button>
        </div>
      </Card>
    </div>
  );
};

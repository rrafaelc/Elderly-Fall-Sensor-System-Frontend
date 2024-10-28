import { useState } from "react";
import { Button, Input, Typography, Card, message } from "antd";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";

const { Title, Text } = Typography;

export const CadastrarSensor = () => {
  const { loading, setLoading, increaseStep, decreaseStep } =
    useCadastrarSensor();
  const [serialNumber, setSerialNumber] = useState("");

  const handleSubmit = async () => {
    if (!serialNumber) {
      message.warning("Por favor, insira o número de série.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/sensors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serialNumber }),
      });

      if (response.ok) {
        message.success("Sensor cadastrado com sucesso!");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Erro ao cadastrar o sensor.");
      }
    } catch (error) {
      message.error("Erro ao se conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-2">
      <Card className="w-full p-2">
        <Title level={2} className="text-center mb-4">
          Cadastrar Sensor
        </Title>
        <Text className="mb-2">
          Por favor, insira o número de série do sensor:
        </Text>
        <Input
          placeholder="Número de Série"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-center gap-4">
          <Button
            type="default"
            onClick={() => decreaseStep()}
            disabled={loading}
          >
            Voltar
          </Button>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            {loading ? "Cadastrando" : "Cadastrar"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

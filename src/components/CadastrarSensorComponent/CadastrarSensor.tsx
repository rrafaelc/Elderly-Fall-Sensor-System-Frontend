import { useState } from "react";
import { Button, Input, Typography, Card } from "antd";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

export const CadastrarSensor = () => {
  const { loading, setLoading, increaseStep, decreaseStep } =
    useCadastrarSensor();
  const [serialNumber, setSerialNumber] = useState("1");

  const handleSubmit = async () => {
    if (!serialNumber) {
      toast.warning("Por favor, insira o número de série.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Cadastrando o sensor...");

    setTimeout(async () => {
      try {
        toast.update(toastId, {
          render: "Sensor cadastrado com sucesso",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        increaseStep();
        return;

        const response = await fetch("/api/sensors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ serialNumber }),
        });

        if (response.ok) {
          toast.update(toastId, {
            render: "Sensor cadastrado com sucesso",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          const errorData = await response.json();
          toast.update(toastId, {
            render: errorData.message || "Erro ao cadastrar o sensor.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.update(toastId, {
          render: "Erro ao se conectar ao servidor.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }

      increaseStep();
    }, 3000);
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
            {loading ? "Aguarde" : "Cadastrar"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

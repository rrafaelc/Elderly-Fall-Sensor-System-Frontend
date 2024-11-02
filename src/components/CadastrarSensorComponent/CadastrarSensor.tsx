import { useState } from "react";
import { Button, Input, Typography, Card } from "antd";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { toast } from "react-toastify";
import axios from "axios";

const { Title, Text } = Typography;

export const CadastrarSensor = () => {
  const host = import.meta.env.VITE_API_HOST;
  const { loading, serialNumber, setSerialNumber, setLoading, increaseStep, decreaseStep } =
    useCadastrarSensor();
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async () => {
    if (!serialNumber) {
      toast.warning("Por favor, insira o número de série.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Cadastrando o sensor...");

    try {
      const bodyFormData = new FormData();
      bodyFormData.append('serial_number', serialNumber);

      const response = await axios.post(`${host}/v1/serial`, bodyFormData, config);
      if (response.status >= 200 && response.status < 300) {
        toast.update(toastId, {
          render: "Sensor cadastrado com sucesso",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        increaseStep();
      } else {
        toast.update(toastId, {
          render: "Erro ao cadastrar o sensor.",
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

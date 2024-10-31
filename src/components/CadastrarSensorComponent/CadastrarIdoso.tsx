import { useState } from "react";
import { Button, Input, Typography, Card, Select, DatePicker, Form, message } from "antd";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";

const { Title } = Typography;
const { Option } = Select;

export const CadastrarIdoso = () => {
  const { loading, setLoading, increaseStep, decreaseStep } =
    useCadastrarSensor();
  const [serialNumber] = useState("123456789");

  // eslint-disable-next-line
  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const response = await fetch("/api/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, serialNumber }),
      });

      if (response.ok) {
        message.success("Cadastro realizado com sucesso!");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Erro ao realizar o cadastro.");
      }
    } catch (error) {
      message.error("Erro ao se conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center sm:p-2">
      <Card className="w-full max-w-lg p-6 shadow-md">
        <Title level={2} className="text-center mb-4">
          Cadastrar Idoso
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nome Completo"
            name="nome"
            rules={[{ required: true, message: "Por favor, insira o nome completo." }]}
          >
            <Input placeholder="Nome Completo" />
          </Form.Item>

          <Form.Item
            label="Data de Nascimento"
            name="dataNascimento"
            rules={[{ required: true, message: "Por favor, selecione a data de nascimento." }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Tipo Sanguíneo"
            name="tipoSanguineo"
            rules={[{ required: true, message: "Por favor, selecione o tipo sanguíneo." }]}
          >
            <Select placeholder="Selecione o tipo sanguíneo">
              <Option value="A+">A+</Option>
              <Option value="A-">A-</Option>
              <Option value="B+">B+</Option>
              <Option value="B-">B-</Option>
              <Option value="AB+">AB+</Option>
              <Option value="AB-">AB-</Option>
              <Option value="O+">O+</Option>
              <Option value="O-">O-</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Altura (cm)"
            name="altura"
            rules={[{ required: true, message: "Por favor, insira a altura." }]}
          >
            <Input type="number" placeholder="Altura em cm" />
          </Form.Item>

          <Form.Item
            label="Peso (kg)"
            name="peso"
            rules={[{ required: true, message: "Por favor, insira o peso." }]}
          >
            <Input type="number" placeholder="Peso em kg" />
          </Form.Item>

          <Form.Item
            label="Condições Preexistentes"
            name="condicoes"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={3} placeholder="Ex: Diabetes, Hipertensão" />
          </Form.Item>

          <Form.Item label="Número de Série do Sensor">
            <Input value={serialNumber} readOnly className="bg-gray-100" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full mb-2 md:mb-4"
          >
            Cadastrar
          </Button>
          <Button
            type="default"
            onClick={() => decreaseStep()}
            disabled={loading}
            className="w-full"
          >
            Voltar
          </Button>
        </Form>
      </Card>
    </div>
  );
};

import { Button, Input, Typography, Card, Select, Form } from "antd";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { toast } from "react-toastify";
import axios from "axios";
import { PatternFormat } from "react-number-format";

import { Idoso } from "dtos/Idoso.dto";
import { useState } from "react";
import { IUser } from "modules/auth/types";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

registerLocale("pt-BR", ptBR);

export const CadastrarIdoso = () => {
  const host = import.meta.env.VITE_API_HOST;
  const navigate = useNavigate();
  const { loading, serialNumber, setFinished, setLoading, decreaseStep } =
    useCadastrarSensor();
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!) as IUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async ({
    nomeCompleto,
    rg,
    cpf,
    dataNasc,
    tipoSanguineo,
    altura,
    peso,
    condicoesPreExistentes,
  }: Idoso) => {
    const cleanCpf = cpf.replace(/[^\d]/g, "");

    if (!cleanCpf || cleanCpf.length !== 11) {
      toast.warning("Por favor, insira um CPF válido.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Cadastrando o idoso...");

    const bodyFormData = new FormData();
    bodyFormData.append("user_id", user.id.toString());
    bodyFormData.append("name", nomeCompleto);
    bodyFormData.append("rg", rg);
    bodyFormData.append("cpf", cleanCpf);
    bodyFormData.append("dataNasc", dataNasc);
    bodyFormData.append("tipoSanguineo", tipoSanguineo);
    bodyFormData.append("altura", altura.toString());
    bodyFormData.append("peso", peso.toString());
    bodyFormData.append("condicoesPreExistentes", condicoesPreExistentes);
    bodyFormData.append("whatsapp_number", "1");
    bodyFormData.append("email", "temp");
    bodyFormData.append("address", "temp");

    try {
      const response = await axios.post(
        `${host}/v1/person`,
        bodyFormData,
        config
      );

      if (response.status >= 200 && response.status < 300) {
        const response = await axios.post(
          `${host}/v1/devicecreate`,
          bodyFormData,
          config
        );

        if (response.status >= 200 && response.status < 300) {
          toast.update(toastId, {
            render: "Idoso cadastrado com sucesso",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });

          setFinished(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000)
        } else {
          toast.update(toastId, {
            render: "Erro ao cadastrar o idoso.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      } else {
        toast.update(toastId, {
          render: "Erro ao cadastrar o idoso.",
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
    <div className="bg-gray-100 flex items-center justify-center sm:p-2">
      <Card className="w-full max-w-lg p-6 shadow-md">
        <Title level={2} className="text-center mb-4">
          Cadastrar Idoso
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nome Completo"
            name="nomeCompleto"
            rules={[
              { required: true, message: "Por favor, insira o nome completo." },
            ]}
          >
            <Input placeholder="Nome Completo" />
          </Form.Item>

          <Form.Item
            label="RG"
            name="rg"
            rules={[{ required: true, message: "Por favor, insira o RG." }]}
          >
            <Input placeholder="RG" />
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            rules={[{ required: true, message: "Por favor, insira o CPF." }]}
          >
            <PatternFormat
              format="###.###.###-##"
              allowEmptyFormatting
              mask="_"
              customInput={Input}
            />
          </Form.Item>

          <Form.Item
            label="Data de Nascimento"
            name="dataNasc"
            rules={[
              {
                required: true,
                message: "Por favor, selecione a data de nascimento.",
              },
            ]}
          >
            <DatePicker
              className="w-full"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data de Nascimento"
              maxDate={new Date()}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              locale="pt-BR"
              customInput={<Input />}
            />
          </Form.Item>

          <Form.Item
            label="Tipo Sanguíneo"
            name="tipoSanguineo"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o tipo sanguíneo.",
              },
            ]}
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
            name="condicoesPreExistentes"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={3} placeholder="Ex: Diabetes, Hipertensão" />
          </Form.Item>

          <Form.Item label="Número de Série do Sensor">
            <Input
              name="numeroDeSerie"
              value={serialNumber}
              disabled
              readOnly
              className="!text-black"
            />
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

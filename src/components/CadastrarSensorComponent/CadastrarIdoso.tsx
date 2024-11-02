import {
  Button,
  Input,
  Typography,
  Card,
  Select,
  Form,
  InputNumber,
} from "antd";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { Id, toast } from "react-toastify";
import axios from "axios";
import { PatternFormat } from "react-number-format";

import { LinkOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

import { Idoso } from "dtos/Idoso.dto";
import { useRef, useState } from "react";
import { IUser } from "modules/auth/types";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { ViaCepDto } from "dtos/ViaCep.dto";

const { Title } = Typography;
const { Option } = Select;

registerLocale("pt-BR", ptBR);

export const CadastrarIdoso = () => {
  const host = import.meta.env.VITE_API_HOST;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    loading,
    serialNumber,
    sensorName,
    setFinished,
    setLoading,
    decreaseStep,
  } = useCadastrarSensor();
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [cep, setCep] = useState("");
  const [viaCep, setViaCep] = useState<ViaCepDto | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!) as IUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.currentTarget.value;
    setCep(newCep);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (newCep.replace(/[^\d]/g, "").length === 8) {
      setLoading(true);
      const toastId = toast.loading("Buscando o CEP...");
      timeoutRef.current = setTimeout(() => {
        buscarCep(newCep, toastId);
      }, 3000);
    }
  };

  const buscarCep = async (cep: string, toastId: Id) => {
    try {
      const response = await axios.get<ViaCepDto>(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      if (response.data.erro) {
        toast.update(toastId, {
          render: "CEP não existe, tente novamente.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });

        return;
      }

      if (response.data) {
        toast.update(toastId, {
          render: "Cep preenchido com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        const viaCepData = response.data;
        setViaCep(viaCepData);
        form.setFieldsValue({
          estado: viaCepData.uf,
          cidade: viaCepData.localidade,
          bairro: viaCepData.bairro,
          rua: viaCepData.logradouro,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Erro ao buscar o CEP.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async ({
    nomeCompleto,
    rg,
    cpf,
    dataNasc,
    tipoSanguineo,
    altura,
    peso,
    cep: cepData,
    estado,
    cidade,
    bairro,
    rua,
    numero,
    condicoesPreExistentes,
  }: Idoso) => {
    const cleanCpf = cpf.replace(/[^\d]/g, "");
    const cleanCep = cep.replace(/[^\d]/g, "");

    if (!cleanCpf || cleanCpf.length !== 11) {
      toast.warning("Por favor, insira um CPF válido.");
      return;
    }

    if (!cleanCep || cleanCep.length !== 8) {
      toast.warning("Por favor, insira um CEP válido.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Cadastrando o idoso...");

    const idosoFormData = new FormData();
    const sensorFormData = new FormData();

    idosoFormData.append("user_id", user.id.toString());
    idosoFormData.append("name", nomeCompleto);
    idosoFormData.append("rg", rg);
    idosoFormData.append("cpf", cleanCpf);
    idosoFormData.append("date_of_birth", dataNasc);
    idosoFormData.append("blood_type", tipoSanguineo);
    idosoFormData.append("altura", altura.toString());
    idosoFormData.append("peso", peso.toString());
    idosoFormData.append("zip_code", cepData.replace(/_+$/, ""));
    idosoFormData.append("state", estado);
    idosoFormData.append("neighborhood", bairro);
    idosoFormData.append("city", cidade);
    idosoFormData.append("street", rua);
    idosoFormData.append("street_number", numero.toString());
    idosoFormData.append("conditions", condicoesPreExistentes ?? null);
    idosoFormData.append("whatsapp_number", "1");
    idosoFormData.append("email", "temp");
    idosoFormData.append("address", "temp");

    sensorFormData.append("user_id", user.id.toString());
    sensorFormData.append("name", sensorName);
    sensorFormData.append("serial_number", serialNumber);
    sensorFormData.append("whatsapp_number", "1");

    try {
      const response = await axios.post(
        `${host}/v1/person`,
        idosoFormData,
        config
      );

      if (response.status >= 200 && response.status < 300) {
        const response = await axios.post(
          `${host}/v1/devicecreate`,
          sensorFormData,
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
          }, 1000);
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

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Número de Série do Sensor">
            <Input
              name="numeroDeSerie"
              value={serialNumber}
              disabled
              readOnly
              className="!text-black"
            />
          </Form.Item>

          <Form.Item
            label="Nome Completo"
            name="nomeCompleto"
            rules={[
              {
                required: true,
                message: "Por favor, insira o nome completo.",
              },
            ]}
          >
            <Input placeholder="Nome Completo" maxLength={50} showCount />
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

          <Form.Item label="CEP" name="cep">
            <div>
              <PatternFormat
                format="#####-###"
                allowEmptyFormatting
                mask="_"
                value={cep}
                onChange={handleCepChange}
                disabled={loading}
                customInput={Input}
              />
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <Text>Não sabe o cep?</Text>
                <Link
                  strong
                  href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                  target="_blank"
                >
                  Clique aqui <LinkOutlined />
                </Link>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            label="Estado"
            name="estado"
            rules={[
              {
                required: true,
                message: "Por favor, insira a sigla do estado.",
              },
            ]}
          >
            <Input
              placeholder="SP"
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Cidade"
            name="cidade"
            rules={[
              {
                required: true,
                message: "Por favor, insira a cidade.",
              },
            ]}
          >
            <Input placeholder="Itapira" disabled />
          </Form.Item>

          <Form.Item
            label="Bairro"
            name="bairro"
            rules={[
              {
                required: true,
                message: "Por favor, insira o bairro.",
              },
            ]}
          >
            <Input placeholder="Centro" disabled />
          </Form.Item>

          <Form.Item
            label="Rua"
            name="rua"
            rules={[
              {
                required: true,
                message: "Por favor, insira o nome da rua.",
              },
            ]}
          >
            <Input
              placeholder="Rua"
              maxLength={50}
              showCount
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Número"
            name="numero"
            rules={[
              {
                required: true,
                message: "Por favor, insira o número.",
              },
            ]}
          >
            <InputNumber placeholder="123" min={0} />
          </Form.Item>

          <Form.Item
            label="Condições Preexistentes"
            name="condicoesPreExistentes"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={3} placeholder="Ex: Diabetes, Hipertensão" />
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

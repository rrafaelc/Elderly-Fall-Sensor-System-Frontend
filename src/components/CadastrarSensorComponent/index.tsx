import { LoadingOutlined } from "@ant-design/icons";
import { Spinner } from "@chakra-ui/react";
import { Button, Steps } from "antd";
import { StepProps } from "antd/lib";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { useAuthStore } from "modules/auth/application";
import { useEffect } from "react";
import { useNavigate } from "shared/Router";
import { EmparelharSensor } from "./EmparelharSensor";

export const CadastrarSensorComponent = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  const { currentStep, loading, setTotalItems, increaseStep, decreaseStep } =
    useCadastrarSensor();

  const steps = [
    {
      title: "Emparelhar sensor",
      content: <EmparelharSensor />
    },
    {
      title: "Cadastrar sensor",
      content: <h1>Teste2</h1>,
    },
    {
      title: "Cadastrar idoso(a)",
      content: <h1>Teste3</h1>,
    },
  ];

  const items: StepProps[] = steps.map((item, index) => ({
    key: item.title,
    title: item.title,
    icon: currentStep === index && loading ? <LoadingOutlined /> : undefined,
  }));

  useEffect(() => {
    setTotalItems(steps.length);

    if (!isAuthenticated) navigate("/entrar");
  }, []);

  if (isAuthenticated) {
    return (
      <>
        <div className="w-full max-w-[1200px] px-5">
          <Steps current={currentStep} items={items} />
          {steps[currentStep].content}
          {/* <Button
            onClick={() => decreaseStep()}
            disabled={currentStep === 0}
            className="bg-gray-200 hover:bg-gray-300"
          >
            Voltar
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="primary" onClick={() => increaseStep()}>
              Próximo
            </Button>
          ) : (
            <Button type="primary">Concluir</Button>
          )} */}
        </div>
      </>
    );
  }

  return <Spinner size="xl" color="blue.500" />;
};

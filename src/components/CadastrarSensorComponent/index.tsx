import { LoadingOutlined } from "@ant-design/icons";
import { Spinner } from "@chakra-ui/react";
import { Steps } from "antd";
import { StepProps } from "antd/lib";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { useEffect } from "react";
import { EmparelharSensor } from "./EmparelharSensor";
import { CadastrarSensor } from "./CadastrarSensor";
import { CadastrarIdoso } from "./CadastrarIdoso";

export const CadastrarSensorComponent = () => {
  const { currentStep, loading, setTotalItems, increaseStep, decreaseStep, resetSteps } =
    useCadastrarSensor();

  const steps = [
    {
      title: "Emparelhar sensor",
      content: <EmparelharSensor />,
    },
    {
      title: "Cadastrar sensor",
      content: <CadastrarSensor />,
    },
    {
      title: "Cadastrar idoso",
      content: <CadastrarIdoso />,
    },
  ];

  const items: StepProps[] = steps.map((item, index) => ({
    key: item.title,
    title: item.title,
    icon: currentStep === index && loading ? <LoadingOutlined /> : undefined,
  }));

  useEffect(() => {
    setTotalItems(steps.length);

    return () => {
      resetSteps()
    }
  }, []);

  return (
    <>
      <div className="w-full max-w-[1200px] px-5">
        <Steps current={currentStep} items={items} className="md:mb-2" />
        {steps[currentStep].content}
      </div>
    </>
  );
};

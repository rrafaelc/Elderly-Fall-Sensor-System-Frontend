import { LoadingOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import { StepProps } from "antd/lib";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { useEffect } from "react";

export const CadastrarSensorComponent = () => {
  const { current, loading, setTotalItems } = useCadastrarSensor();

  const steps = [
    {
      title: "Emparelhar sensor",
      content: <h1>Teste1</h1>,
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
    icon: current === index && loading ? <LoadingOutlined /> : undefined,
  }));

  useEffect(() => {
    setTotalItems(items.length);
  }, []);

  return (
    <>
      <div className="w-full max-w-[1200px] px-5">
        <Steps current={current} items={items} />
        {steps[current].content}
      </div>
    </>
  );
};

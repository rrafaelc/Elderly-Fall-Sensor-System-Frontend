import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { Steps } from "antd";
import { StepProps } from "antd/lib";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { useEffect, useState } from "react";
import { EmparelharSensor } from "./EmparelharSensor";
import { CadastrarSensor } from "./CadastrarSensor";
import { CadastrarIdoso } from "./CadastrarIdoso";
import { useNavigate } from "react-router-dom";
import { IUser } from "modules/auth/types";

export const CadastrarSensorComponent = () => {
  const host = import.meta.env.VITE_API_HOST;
  const navigate = useNavigate();
  const {
    currentStep,
    loading,
    setLoading,
    setTotalItems,
    setFinished,
    setSensorName,
    resetSteps,
  } = useCadastrarSensor();

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

  const checkSensors = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")!) as IUser;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(
        `${host}/v1/device/user/${user.id}`,
        config
      );
      if (response.status >= 200 && response.status < 300) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTotalItems(steps.length);

    return () => {
      resetSteps();
      setFinished(false);
      setSensorName("");
      checkSensors();
      setLoading(false);
    };
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

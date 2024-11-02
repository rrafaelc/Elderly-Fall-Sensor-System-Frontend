import React, { createContext, useContext, useState, ReactNode } from "react";

interface CadastrarSensorContextType {
  currentStep: number;
  totalItems: number;
  loading: boolean;
  serialNumber: string;
  finished: boolean;
  setSerialNumber: (serial: string) => void;
  setTotalItems: (total: number) => void;
  setLoading:(isLoading: boolean) => void;
  setFinished:(isFinished: boolean) => void;
  increaseStep: () => void;
  decreaseStep: () => void;
  resetSteps: () => void;
}

const CadastrarSensorContext = createContext<
  CadastrarSensorContextType | undefined
>(undefined);

interface CadastrarSensorProviderProps {
  children: ReactNode;
}

export const CadastrarSensorProvider: React.FC<
  CadastrarSensorProviderProps
> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalItems, settotalItems] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(false);
  const [serialNumber, setserialNumber] = useState<string>("");
  const [finished, setisFinished] = useState<boolean>(false);

  const setTotalItems = (total: number) => {
    settotalItems(total);
  };

  const setLoading = (isLoading: boolean) => {
    setloading(isLoading);
  };

  const setSerialNumber = (serial: string) => {
    setserialNumber(serial);
  }

  const setFinished = (isFinished: boolean) => {
    setisFinished(isFinished);
  };

  const increaseStep = () => {
    if (currentStep + 1 > totalItems) return;

    setCurrentStep((prev) => (prev += 1));
  };

  const decreaseStep = () => {
    if (currentStep - 1 < 0) return;

    setCurrentStep((prev) => (prev -= 1));
  };

  const resetSteps = () => {
    setCurrentStep(0);
  };

  return (
    <CadastrarSensorContext.Provider
      value={{
        currentStep,
        totalItems,
        loading,
        serialNumber,
        finished,
        setFinished,
        setSerialNumber,
        setTotalItems,
        setLoading,
        increaseStep,
        decreaseStep,
        resetSteps,
      }}
    >
      {children}
    </CadastrarSensorContext.Provider>
  );
};

export const useCadastrarSensor = (): CadastrarSensorContextType => {
  const context = useContext(CadastrarSensorContext);
  if (!context) {
    throw new Error(
      "useCadastrarSensor deve ser usado dentro de um CadastrarSensorProvider"
    );
  }
  return context;
};

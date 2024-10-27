import React, { createContext, useContext, useState, ReactNode } from "react";

interface CadastrarSensorContextType {
  current: number;
  totalItems: number;
  loading: boolean;
  setTotalItems: (total: number) => void;
  setLoading:(isLoading: boolean) => void;
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
  const [current, setCurrent] = useState<number>(0);
  const [totalItems, settotalItems] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(false);

  const setTotalItems = (total: number) => {
    settotalItems(total);
  };

  const setLoading = (isLoading: boolean) => {
    setloading(isLoading);
  };

  const increaseStep = () => {
    if (current + 1 > totalItems) return;

    setCurrent((prev) => (prev += 1));
  };

  const decreaseStep = () => {
    if (current - 1 < 0) return;

    setCurrent((prev) => (prev -= 1));
  };

  const resetSteps = () => {
    setCurrent(0);
  };

  return (
    <CadastrarSensorContext.Provider
      value={{
        current,
        totalItems,
        loading,
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

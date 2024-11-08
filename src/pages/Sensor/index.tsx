import { ErrorPageStrategy } from "shared/Result";
import { SensorCard } from "./SensorCard";
import { IdosoDescricoes } from "./IdosoDescricoes";

const SensorPage = () => {
  return (
      <div className="w-full flex justify-center bg-gray-200">
        <div className="w-full flex flex-col px-2 py-2 sm:py-10 gap-2 max-w-[800px] sm:flex-row">
          <SensorCard />
          <IdosoDescricoes />
        </div>
      </div>
  );
};

export const Component = SensorPage;

export const ErrorBoundary = ErrorPageStrategy;

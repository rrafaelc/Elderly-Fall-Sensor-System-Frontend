import { ReactNode } from 'react';
import { CadastrarSensorProvider } from './CadastrarSensorContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <CadastrarSensorProvider>
      {children}
    </CadastrarSensorProvider>
  );
};

export default Providers;

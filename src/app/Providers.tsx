import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme } from "theme";

import { queryClient } from "utils";

import { AuthProvider } from "modules/auth/application";

import ContextProvider from "contexts";

import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  children: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            {children}
            <ToastContainer />
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ContextProvider>
  );
};

export { Providers };

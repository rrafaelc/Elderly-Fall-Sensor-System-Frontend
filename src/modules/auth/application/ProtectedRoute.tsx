import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "modules/auth/application";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useCadastrarSensor } from "contexts/CadastrarSensorContext";
import { IUser } from "../types";

interface ProtectedRouteProps {
  children?: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/entrar",
}: ProtectedRouteProps) => {
  const host = import.meta.env.VITE_API_HOST;
  const { finished } = useCadastrarSensor();
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);
  const [hasSensors, setHasSensors] = useState<boolean | null>(null);
  const location = useLocation();

  const checkSensors = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")!) as IUser;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(`${host}/v1/device/${user.id}`, config);
      if (response.status >= 200 && response.status < 300) {
        setHasSensors(true);
      }
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
      setHasSensors(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkSensors();
    }
  }, [isAuthenticated, finished]);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (hasSensors === null) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="xl" color="blue.500" />
      </div>
    );
  }

  if (!hasSensors && location.pathname !== "/cadastro-do-sensor") {
    return <Navigate to="/cadastro-do-sensor" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

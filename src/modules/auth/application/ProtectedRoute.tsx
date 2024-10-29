import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "modules/auth/application";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

interface ProtectedRouteProps {
  children?: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/entrar",
}: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);
  const [hasSensors, setHasSensors] = useState<boolean | null>(null);
  const location = useLocation();

  const checkSensors = async () => {
    setTimeout(async () => {
      try {
        const response = await axios.get("/api/sensores");
        //setHasSensors(response.data.length > 0);
        setHasSensors(false);
      } catch (error) {
        console.error("Erro ao buscar sensores:", error);
        //setHasSensors(false);
        setHasSensors(false);
      }
    }, 5000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkSensors();
    }
  }, [isAuthenticated]);

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

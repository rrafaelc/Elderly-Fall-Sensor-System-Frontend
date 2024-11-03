import { ProtectedRoute } from "modules/auth/application/ProtectedRoute";
import { PublicRoute } from "modules/auth/application/PublicRoute";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import { Layout } from "shared/Layout";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Layout />
      </>
    ),
    children: [
      // Rotas públicas
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/",
            lazy: () => import("./PaginaInicial"),
          },
          {
            path: "/entrar",
            lazy: () => import("./SignIn"),
          },
          {
            path: "/registrar",
            lazy: () => import("./SignUp"),
          },
          {
            path: "/inspiracao",
            lazy: () => import("./Inspiracao"),
          },
          {
            path: "/beneficios",
            lazy: () => import("./Beneficios"),
          },
          {
            path: "/sobre",
            lazy: () => import("./Sobre"),
          },
        ],
      },
      // Rotas protegidas
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            lazy: () => import("./Dashboard"),
          },
          {
            path: "/sensor",
            lazy: () => import("./Sensor"),
          },
          {
            path: "/configuracoes/sensibilidade",
            lazy: () => import("./Configuracoes/Sensibilidade"),
          },
          {
            path: "/configuracoes/dados-pessoais",
            lazy: () => import("./Configuracoes/DadosPessoais"),
          },
          {
            path: "/informacoes/historico-de-acidentes",
            lazy: () => import("./Informacoes/HistoricoDeAcidentes"),
          },
          {
            path: "/cadastro-do-sensor",
            lazy: () => import("./CadastrarSensor"),
          },
          {
            path: "/suporte",
            lazy: () => import("./Suporte"),
          },
        ],
      },
    ],
  },
]);

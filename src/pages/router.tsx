// eslint-disable-next-line no-restricted-imports
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
      {
        path: "/",
        lazy: () => import("./PaginaInicial"),
      },
      {
        path: "/dashboard",
        lazy: () => import("./Dashboard"),
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
        path: "/sensor",
        lazy: () => import("./Sensor"),
      },
      // {
      //   path: "/configuracoes/emparelhar-com-a-internet",
      //   lazy: () => import("./Configuracoes/EmparelharComInternet"),
      // },
      // {
      //   path: "/configuracoes/cadastrar-idoso",
      //   lazy: () => import("./Configuracoes/CadastrarIdoso"),
      // },
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
      // {
      //   path: "/informacoes/alarmes-e-notificacoes",
      //   lazy: () => import("./Informacoes/AlarmeENotificacoes"),
      // },
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
      {
        path: "/suporte",
        lazy: () => import("./Suporte"),
      },
      {
        path: "/cadastro-do-sensor",
        lazy: () => import("./CadastrarSensor"),
      },
    ],
  },
]);

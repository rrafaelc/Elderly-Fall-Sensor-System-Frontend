// eslint-disable-next-line no-restricted-imports
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import { Layout } from "shared/Layout";

import { homePageLoader } from "./Home/loader";
import { productPageLoader } from "./Product/loader";
import { productsPageLoader } from "./Products/loader";

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
        loader: homePageLoader,
        lazy: () => import("./Home"),
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
        path: "/sensores",
        lazy: () => import("./Sensores"),
      },
      {
        path: "/configuracoes/emparelhar-com-a-internet",
        lazy: () => import("./Configuracoes/EmparelharComInternet"),
      },
      {
        path: "/configuracoes/cadastrar-idoso",
        lazy: () => import("./Configuracoes/CadastrarIdoso"),
      },
      {
        path: "/configuracoes/contato-de-emergencia",
        lazy: () => import("./Configuracoes/ContatoDeEmergencia"),
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
        path: "/informacoes/alarmes-e-notificacoes",
        lazy: () => import("./Informacoes/AlarmeENotificacoes"),
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
      {
        path: "/suporte",
        lazy: () => import("./Suporte"),
      },
    ],
  },
]);

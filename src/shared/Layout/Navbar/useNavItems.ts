import { useAuthStore } from "modules/auth/application";

import { INavItem } from "./INavItem";

export const useNavItems = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  return isAuthenticated ? NAV_ITEMS_AUTHENTICATED : NAV_ITEMS_NOT_AUTHENTICATED;
};

export const NAV_ITEMS_AUTHENTICATED: Array<INavItem> = [
  {
    label: "Dashboard",
    href: '/dashboard'
  },
  {
    label: "Meus sensor",
    href: '/sensor'
  },
  {
    label: "Configurações",
    children: [
      {
        label: "Emparelhar com a internet",
        subLabel: "Conecte o sensor com a internet",
        href: "/configuracoes/emparelhar-com-a-internet",
      },
      {
        label: "Cadastrar idoso(a)",
        subLabel: "Cadastre as informações do idoso(a)",
        href: "/configuracoes/cadastrar-idoso",
      },
      {
        label: "Sensibilidade",
        subLabel: "Ajuste a sensibilidade do sensor",
        href: "/configuracoes/sensibilidade",
      },
      {
        label: "Dados pessoais",
        subLabel: "Atualizar seus dados de usuário",
        href: "/configuracoes/dados-pessoais",
      },
    ],
  },
  {
    label: "Informações",
    children: [
      {
        label: "Histórico de acidentes",
        subLabel: "Veja um dashboard com o histórico de acidentes registrado pelo sensor",
        href: "/informacoes/historico-de-acidentes",
      },
      {
        label: "Alarmes e notificações",
        subLabel: "Defina alarmes e notificações",
        href: "/informacoes/alarmes-e-notificacoes",
      },
    ],
  },
  {
    label: "Suporte",
    href: "/suporte",
  },
];

export const NAV_ITEMS_NOT_AUTHENTICATED: Array<INavItem> = [
  {
    label: "Página Inicial",
    href: '/'
  },
  {
    label: "Inspiração",
    href: "/inspiracao"
  },
  {
    label: "Benefícios",
    href: "/beneficios",
  },
  {
    label: "Sobre",
    href: "/sobre",
  },
];

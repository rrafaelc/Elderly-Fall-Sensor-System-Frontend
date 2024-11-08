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
    label: "Meu sensor",
    href: '/sensor'
  },
  {
    label: "Configurações",
    children: [
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
  // {
  //   label: "Informações",
  //   children: [
  //     {
  //       label: "Histórico de acidentes",
  //       subLabel: "Veja um dashboard com o histórico de acidentes registrado pelo sensor",
  //       href: "/informacoes/historico-de-acidentes",
  //     },
  //   ],
  // },
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

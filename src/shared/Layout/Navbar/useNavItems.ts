import { useAuthStore } from "modules/auth/application";

import { INavItem } from "./INavItem";

export const useNavItems = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  // return isAuthenticated ? NAV_ITEMS : NAV_ITEMS.slice(0, NAV_ITEMS.length - 1);
  return isAuthenticated ? NAV_ITEMS_AUTHENTICATED : NAV_ITEMS_NOT_AUTHENTICATED;
};

export const NAV_ITEMS_AUTHENTICATED: Array<INavItem> = [
  {
    label: "Página Inicial",
    href: '/'
  },
  {
    label: "Meus sensores",
    href: '/sensores'
  },
  {
    label: "Configurações",
    children: [
      {
        label: "Emparelhar com a internet",
        subLabel: "Conecte o sensor com a internet",
        href: "https://choc-ui.com/",
      },
      {
        label: "Alarmes e notificações",
        subLabel: "Defina alarmes e notificações",
        href: "https://chakra-templates.dev/",
      },
      {
        label: "Histórico de acidentes",
        subLabel: "Veja um dashboard com o histórico de acidentes registrado pelo sensor",
        href: "https://tailwindui.com/components#product-ecommerce",
      },
      {
        label: "Gerenciamento de Contatos",
        subLabel: "Adicione ou remova contatos de emergência",
        href: "https://tailwindui.com/components#product-ecommerce",
      },
      {
        label: "Sensibilidade",
        subLabel: "Ajuste a sensibilidade do sensor",
        href: "https://tailwindui.com/components#product-ecommerce",
      }
    ],
  },
  {
    label: "Dados pessoais",
    children: [
      {
        label: "Vite.js",
        subLabel: "Next generation Frontend Tooling",
        href: "https://vitejs.dev/",
      },
      {
        label: "Fake Store API",
        subLabel: "Free rest API for e-commerce",
        href: "https://fakestoreapi.com/",
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

// export const NAV_ITEMS_NOT_AUTHENTICATED: Array<INavItem> = [
//   {
//     label: "Inspiration",
//     children: [
//       {
//         label: "Explore Choc UI",
//         subLabel: "Set of prebuilt components",
//         href: "https://choc-ui.com/",
//       },
//       {
//         label: "Explore Chakra UI Templates",
//         subLabel: "Set of opensource prebuilt components",
//         href: "https://chakra-templates.dev/",
//       },
//       {
//         label: "Tailwind UI",
//         subLabel: "Prebuilt e-commerce components",
//         href: "https://tailwindui.com/components#product-ecommerce",
//       },
//     ],
//   },
//   {
//     label: "Demo Providers",
//     children: [
//       {
//         label: "Vite.js",
//         subLabel: "Next generation Frontend Tooling",
//         href: "https://vitejs.dev/",
//       },
//       {
//         label: "Fake Store API",
//         subLabel: "Free rest API for e-commerce",
//         href: "https://fakestoreapi.com/",
//       },
//     ],
//   },
//   {
//     label: "Our Products",
//     href: "/products",
//   },
//   {
//     label: "Cart",
//     href: "/cart/1",
//   },
// ];
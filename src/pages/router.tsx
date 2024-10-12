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
        path: "/products",
        loader: productsPageLoader,
        lazy: () => import("./Products"),
      },
      {
        path: "/products/:productId",
        loader: productPageLoader,
        lazy: () => import("./Product"),
      }
    ],
  },
]);

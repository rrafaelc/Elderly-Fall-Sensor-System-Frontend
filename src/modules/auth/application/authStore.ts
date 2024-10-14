import { createContext, useContext } from "react";

import { createStore, useStore } from "zustand";

import { getUser, loginUser, registerUser } from "../infrastructure";
import { ICredentials } from "../infrastructure/loginUser";
import { IUser } from "../types";
import { IRegisterUserProps } from "../infrastructure/registerUser";

const TOKEN = "token";
const USER = "user";

// could be also https://www.npmjs.com/package/zustand-persist lib for advanced use cases
const isLoggedIn = () => !!localStorage.getItem(TOKEN);
const getUserId = () => localStorage.getItem(USER)
    ? (JSON.parse(localStorage.getItem(USER)!) as IUser).id
    : null;

interface IStore {
  isAuthenticated: boolean;
  isError: boolean;
  state: "idle" | "loading" | "finished";
  user: IUser;
  login: (credentials: ICredentials) => Promise<void>;
  register: (body: IRegisterUserProps) => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthStore = ReturnType<typeof initializeAuthStore>;

const zustandContext = createContext<AuthStore | null>(null);

export const Provider = zustandContext.Provider;

export const useAuthStore = <T>(selector: (state: IStore) => T) => {
  const store = useContext(zustandContext);

  if (!store) throw new Error("AuthStore is missing the provider");

  return useStore(store, selector);
};

export const initializeAuthStore = (preloadedState: Partial<IStore> = {}) => {
  return createStore<IStore>((set) => {
    if (isLoggedIn()) {
      set({ state: "loading" });
      const id = getUserId();

      if (!id) throw new Error();

      getUser(id)
        .then((user) => {
          set({
            user,
            isAuthenticated: true,
            state: "finished",
          });
        })
        .catch(() => {
          set({
            isError: true,
            state: "finished",
          });
        });
    } else {
      set({ state: "finished" });
    }

    return {
      isAuthenticated: false,
      isError: false,
      state: isLoggedIn() ? "idle" : "finished",
      user: undefined as unknown as IUser,
      ...preloadedState,
      login: async (credentials: ICredentials) => {
        set({ state: "loading" });

        try {
          const userResponse = await loginUser(credentials);
          const user = await getUser(userResponse.user.id);

          localStorage.setItem(TOKEN, userResponse.token);
          localStorage.setItem(USER, JSON.stringify(user))

          set({
            isAuthenticated: true,
            state: "finished",
            user,
          });
        } catch (e) {
          localStorage.removeItem(TOKEN);
          localStorage.removeItem(USER);

          set({
            isAuthenticated: false,
            state: "finished",
            user: undefined,
          });

          throw e;
        }
      },
      register: async (body: IRegisterUserProps) => {
        set({ state: "loading" });

        try {
          await registerUser(body);

          localStorage.removeItem(TOKEN);
          localStorage.removeItem(USER);

          set({
            isAuthenticated: false,
            state: "finished",
            user: undefined,
          });
        } catch (e) {
          localStorage.removeItem(TOKEN);
          localStorage.removeItem(USER);

          set({
            isAuthenticated: false,
            state: "finished",
            user: undefined,
          });

          throw e;
        }
      },
      logout: async () => {
        set({
          state: "loading",
        });

        return new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
          localStorage.removeItem(TOKEN);
          localStorage.removeItem(USER);
          set({
            isAuthenticated: false,
            state: "finished",
            user: undefined,
          });
        });
      },
    };
  });
};

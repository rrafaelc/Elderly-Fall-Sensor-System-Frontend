import { t } from "utils";

import { useToast } from "shared/Toast";

export const useSignInNotifications = () => {
  const toast = useToast();

  const success = () =>
    toast({
      status: "success",
      title: t("Entrar"),
      description: t("Entrou com sucesso."),
    });

  const failure = () =>
    toast({
      status: "error",
      title: t("Entrar"),
      description: t(
        "Não foi possível entrar. Por favor tente novamente ou entre em contato."
      ),
    });

  return [success, failure] as const;
};

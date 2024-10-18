import { t } from "utils";

import { useToast } from "shared/Toast";

export const useSignUpNotifications = () => {
  const toast = useToast();

  const success = () =>
    toast({
      status: "success",
      title: t("Registrou com sucesso"),
      description: t("Faça o login com a sua nova conta."),
    });

  const failure = () =>
    toast({
      status: "error",
      title: t("Falha ao registrar"),
      description: t(
        "Não foi possível registrar. Por favor tente novamente ou entre em contato."
      ),
    });

  return [success, failure] as const;
};

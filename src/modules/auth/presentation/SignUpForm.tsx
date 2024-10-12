import { useState } from "react";

import {
  Box,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useSecondaryTextColor } from "theme";

import { t } from "utils";

import { TextInput } from "shared/Form";

import { useAuthStore } from "../application";
import { useSignInNotifications } from "./useSignInNotifications";

export const SignUpForm = () => {
  const secondaryColor = useSecondaryTextColor();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [markAllTouched, setMarkallTouched] = useState(false);

  const [notifySuccess, notifyFailure] = useSignInNotifications();
  const login = useAuthStore((store) => store.login);

  return (
    <VStack align="stretch" spacing={8} w="100%" maxW="lg">
      <VStack textAlign="center">
        <Heading fontSize={{ base: "2xl", md: "4xl" }}>
          {t("Crie sua conta")}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color={secondaryColor}>
          {t("já tem uma conta? {link}", {
            link: <Link href="/entrar" color={"blue.400"}>{t("entrar")}</Link>,
          })}
        </Text>
      </VStack>
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
      >
        <VStack
          as="form"
          spacing={4}
          onSubmit={(e) => {
            e.preventDefault();

            if (!email || !password || !username) {
              return;
            }

            login({ email, password })
              .then(() => notifySuccess())
              .catch(() => notifyFailure());
          }}
        >
          <TextInput
            id="username"
            value={username}
            markAllTouched={markAllTouched}
            onChange={(e) => setUsername(e.currentTarget.value)}
          >
            {t("Nome completo")}
          </TextInput>
          <TextInput
            id="email"
            type="email"
            markAllTouched={markAllTouched}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          >
            {t("E-mail")}
          </TextInput>
          <TextInput
            id="password"
            type="password"
            markAllTouched={markAllTouched}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          >
            {t("Senha")}
          </TextInput>
          <TextInput
            id="confirmPassword"
            type="password"
            markAllTouched={markAllTouched}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          >
            {t("Confirme a senha")}
          </TextInput>
          <VStack w="100%" spacing={10}>
            <Button onClick={() => setMarkallTouched(true)} type="submit" colorScheme="blue" w="100%">
              {t("Registrar")}
            </Button>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};

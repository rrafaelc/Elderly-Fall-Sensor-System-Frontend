import { useState } from "react";

import {
  Box,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSecondaryTextColor } from "theme";

import { t } from "utils";

import { PhoneInput, TextInput } from "shared/Form";

import { useAuthStore } from "../application";
import { useSignUpNotifications } from "./useSignUpNotifications";
import { useNavigate } from "shared/Router";

export const SignUpForm = () => {
  const secondaryColor = useSecondaryTextColor();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [markAllTouched, setMarkallTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [notifySuccess, notifyFailure] = useSignUpNotifications();
  const register = useAuthStore((store) => store.register);
  const navigate = useNavigate();

  return (
    <VStack align="stretch" spacing={8} w="100%" maxW="lg">
      <VStack textAlign="center">
        <Heading fontSize={{ base: "2xl", md: "4xl" }}>
          {t("Crie sua conta")}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color={secondaryColor}>
          {t("já tem uma conta? {link}", {
            link: (
              <Link href="/entrar" color={"blue.400"}>
                {t("entrar")}
              </Link>
            ),
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

            if (
              !username ||
              !email ||
              !password ||
              !confirmPassword ||
              !whatsapp
            ) {
              return;
            }

            if (password !== confirmPassword) {
              toast({
                status: "error",
                title: t("Senhas não coincidem"),
                description: t("Confirme a senha exatamente igual a senha."),
              });
              return;
            }

            const onlyNumbers = whatsapp.replace(/\D/g, "");

            if (onlyNumbers.length < 11) {
              toast({
                status: "error",
                title: t("Número Whatsapp incorreto"),
                description: t("Digite corretamente os 11 dígitos do seu número de celular incluindo o DDD."),
              });

              if (!onlyNumbers.length) {
                setWhatsapp("")
              }
              return;
            }

            register({
              name: username,
              email,
              password,
              whatsapp_number: parseInt(onlyNumbers),
            })
              .then(() => {
                notifySuccess();
                navigate("/entrar");
              })
              .catch(() => notifyFailure());
          }}
        >
          <TextInput
            id="username"
            value={username}
            markAllTouched={markAllTouched}
            placeholder="Digite seu nome completo"
            onChange={(e) => setUsername(e.currentTarget.value)}
          >
            {t("Nome completo")}
          </TextInput>
          <TextInput
            id="email"
            type="email"
            markAllTouched={markAllTouched}
            value={email}
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          >
            {t("E-mail")}
          </TextInput>
          <PhoneInput
            id="whatsapp"
            value={whatsapp}
            markAllTouched={markAllTouched}
            placeholder="Digite seu número do WhatsApp"
            onChange={(e) => setWhatsapp(e.currentTarget.value)}
          >
            {t("WhatsApp")}
          </PhoneInput>
          <TextInput
            id="password"
            type={showPassword ? "text" : "password"}
            markAllTouched={markAllTouched}
            value={password}
            placeholder="Crie uma senha"
            isPasswordInput={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onChange={(e) => setPassword(e.currentTarget.value)}
          >
            {t("Senha")}
          </TextInput>
          <TextInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            markAllTouched={markAllTouched}
            value={confirmPassword}
            placeholder="Digite sua senha novamente"
            isPasswordInput={true}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          >
            {t("Confirme a senha")}
          </TextInput>
          <VStack w="100%" spacing={10}>
            <Button
              onClick={() => setMarkallTouched(true)}
              type="submit"
              colorScheme="blue"
              w="100%"
            >
              {t("Registrar")}
            </Button>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};

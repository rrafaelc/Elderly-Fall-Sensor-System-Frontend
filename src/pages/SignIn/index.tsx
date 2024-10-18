import { Center } from "@chakra-ui/react";

import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

import { withRequirePub } from "modules/auth/application";
import { SignInForm } from "modules/auth/presentation";

export const SignInPage = () => {
  return (
    <Page maxW="container.xl">
      <Center py={{ base: 10, md: 12 }}>
        <SignInForm />
      </Center>
    </Page>
  );
};

export const Component = withRequirePub(SignInPage, { to: "/" });

export const ErrorBoundary = ErrorPageStrategy;

import { Center } from "@chakra-ui/react";

import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

import { SignUpForm } from "modules/auth/presentation";
import { withRequirePub } from "modules/auth/application";

export const SignUpPage = () => {
  return (
    <Page maxW="container.xl">
      <Center py={{ base: 10, md: 12 }}>
        <SignUpForm />
      </Center>
    </Page>
  );
};

export const Component = withRequirePub(SignUpPage, { to: "/" });

export const ErrorBoundary = ErrorPageStrategy;

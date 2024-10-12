import { ReactNode, useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";

import { t } from "utils";

interface IProps extends InputProps {
  id: string;
  children: string | ReactNode;
  isRequired?: boolean;
  markAllTouched?: boolean;
}

const TextInput = ({ id, children, isRequired = true, markAllTouched, ...props }: IProps) => {
  const isInvalid = props.value === "" && markAllTouched;

  return (
    <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{children}</FormLabel>
      <Input {...props} />
      {isInvalid && (
        <FormErrorMessage>{t("Campo obrigatório.")}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export { TextInput };

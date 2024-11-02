import { ReactNode } from "react";
import { useMask } from "@react-input/mask";

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  Stack,
} from "@chakra-ui/react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { t } from "utils";

interface IProps extends InputProps {
  id: string;
  children: string | ReactNode;
  isRequired?: boolean;
  markAllTouched?: boolean;
}

const PhoneInput = ({
  id,
  children,
  isRequired = true,
  markAllTouched,
  ...props
}: IProps) => {
  const inputRef = useMask({
    mask: "(__) _____-____",
    replacement: { _: /\d/ },
    showMask: true,
  });

  const isInvalid = props.value === "" && markAllTouched;

  return (
    <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{children}</FormLabel>
      <Input
        {...props}
        ref={inputRef}
        placeholder="(__) ______-____"
        inputMode="tel"
      />
      {isInvalid && (
        <FormErrorMessage>{t("Campo obrigatório.")}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export { PhoneInput };

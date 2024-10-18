import { ReactNode } from "react";

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
  isPasswordInput?: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
}

const TextInput = ({
  id,
  children,
  isRequired = true,
  markAllTouched,
  isPasswordInput,
  showPassword,
  setShowPassword,
  ...props
}: IProps) => {
  const isInvalid = props.value === "" && markAllTouched;
  return (
    <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{children}</FormLabel>
      {isPasswordInput ? (
        <Stack
          w="100%"
          align="center"
          justify="space-between"
          position="relative"
        >
          <Input {...props} />
          {showPassword ? (
            <div
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                padding: 10,
                zIndex: 1000,
              }}
              onClick={() => {
                setShowPassword?.(false);
              }}
            >
              <IoMdEye />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                padding: 10,
                zIndex: 1000,
              }}
              onClick={() => {
                setShowPassword?.(true);
              }}
            >
              <IoMdEyeOff />
            </div>
          )}
        </Stack>
      ) : (
        <Input {...props} />
      )}
      {isInvalid && (
        <FormErrorMessage>{t("Campo obrigatório.")}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export { TextInput };

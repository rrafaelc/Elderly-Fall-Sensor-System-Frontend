import { httpService } from "utils";

export interface IRegisterUserProps {
  name: string;
  email: string;
  whatsapp_number: number;
  password: string;
}

export const registerUser = (body: IRegisterUserProps) => {
  return httpService.post("user", body);
};

import { httpService } from "utils";
import { IUserResponse } from "../types/IUser";

export interface ICredentials {
  email: string;
  password: string;
}

export const loginUser = (body: ICredentials) => {
  return httpService.post<IUserResponse>("login", body);
};

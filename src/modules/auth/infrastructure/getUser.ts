import { httpService } from "utils";

import { IUser } from "../types";

export const getUser = (id: number) => {
  return httpService
    .get<IUser>(`user/${id}`)
    .then((res) => res);
};

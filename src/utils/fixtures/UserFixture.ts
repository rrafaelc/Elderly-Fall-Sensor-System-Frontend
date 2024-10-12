import { IUser } from "modules/auth/types";

import { createFixture } from "./createFixture";

export const UserFixture = createFixture<IUser>({
  id: 1,
  email: "John@gmail.com",
  name: "johnd",
  whatsapp_number: 0,
  cpf: "",
  rg: "",
  email_verified_at: null,
  created_at: "",
  updated_at: ""
});

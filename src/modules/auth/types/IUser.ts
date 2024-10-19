export interface IUser {
  id: number;
  whatsapp_number: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  rg: string;
  cpf: string;
  created_at: string;
  updated_at: string;
}

export interface IUserResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

export interface ViaCepDto {
  uf: string;
  bairro: string;
  cep: string;
  estado: string;
  localidade: string;
  logradouro: string;
  erro?: boolean;
}

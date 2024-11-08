import { Card, Avatar } from "antd";
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IUser } from "modules/auth/types";
import { useEffect, useState } from "react";

export interface Idoso {
  rg: string,
  cpf: string,
  street: string,
  street_number: string,
  neighborhood: string,
  city: string,
  state: string,
  zip_code: string,
  conditions?: string,
  name: string,
  date_of_birth: string,
  created_at: string,
  updated_at: string,
};

export const IdosoDescricoes = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [loading, setLoading] = useState<boolean>(true);
  const [idoso, setIdoso] = useState<Idoso[] | null>(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!) as IUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const getIdosoData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${host}/v1/person/`,
          config
        );

        setIdoso(response.data);
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    };

    getIdosoData();
  }, []);



  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss", {
      locale: ptBR,
    });
  };

  const formatBirthDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <div className="w-full flex justify-center sm:justify-normal">
      <Card loading={false} className="w-full max-w-[300px] sm:max-w-none">
        <Card.Meta
          className="w-full"
          avatar={<Avatar src="images/elder.png" />}
          title="Dados do idoso"
          description={
            idoso?.length ? (
              <div className="flex flex-col sm:gap-1">
                <p>Nome: {idoso[0].name}</p>
                <p>RG: {idoso[0].rg}</p>
                <p>CPF: {idoso[0].cpf}</p>
                <p>
                  Data de Nascimento: {formatBirthDate(idoso[0].date_of_birth)}
                </p>
                <p>
                  Endereço: {idoso[0].street}, {idoso[0].street_number}
                </p>
                <p>Bairro: {idoso[0].neighborhood}</p>
                <p>Cidade: {idoso[0].city}</p>
                <p>Estado: {idoso[0].state}</p>
                <p>CEP: {idoso[0].zip_code}</p>
                <p>Condições: {idoso[0].conditions ?? "N/A"}</p>
                <p>Criado em: {formatDate(idoso[0].created_at)}</p>
                <p>Atualizado em: {formatDate(idoso[0].updated_at)}</p>
              </div>
            ) : (
              <p>Carregando...</p>
            )
          }
        />
      </Card>
    </div>
  );
};

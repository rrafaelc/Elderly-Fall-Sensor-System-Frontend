import { Card, Avatar, Button } from "antd";
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IUser } from "modules/auth/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";
import { useReactToPrint } from "react-to-print";

export interface Idoso {
  id: number;
  user_id: number;
  rg: string;
  cpf: string;
  street: string;
  street_number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  conditions?: string;
  name: string;
  date_of_birth: string;
  blood_type: string;
  created_at: string;
  updated_at: string;
}

export const IdosoDescricoes = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [, setLoading] = useState<boolean>(true);
  const [idoso, setIdoso] = useState<Idoso | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Dados do idoso",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!) as IUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const getIdosoData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Idoso[]>(`${host}/v1/person/`, config);

        const idoso = response.data.find((idoso) => idoso.user_id == user.id);

        setIdoso(
          idoso
            ? {
                ...idoso,
                conditions:
                  idoso.conditions === "null" ? undefined : idoso.conditions,
              }
            : null
        );
      } catch (error) {
        toast.error("Erro ao buscar os dados");
        console.error(error);
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
    <div className="w-full flex flex-col">
      <div
        ref={contentRef}
        className="flex flex-col w-full items-center sm:flex-1"
      >
        <Card
          loading={false}
          className="h-full w-full max-w-[300px] sm:max-w-none"
        >
          <Card.Meta
            className="w-full"
            avatar={<Avatar src="images/elder.png" />}
            title="Dados do idoso"
            description={
              idoso ? (
                <div className="flex flex-col sm:gap-1">
                  <p>Nome: {idoso.name}</p>
                  <p>RG: {idoso.rg}</p>
                  <p>
                    CPF:{" "}
                    <PatternFormat
                      format="###.###.###-##"
                      displayType="text"
                      value={idoso.cpf}
                    />
                  </p>
                  <p>
                    Data de Nascimento: {formatBirthDate(idoso.date_of_birth)}
                  </p>
                  <p>
                    Tipo sanguíneo: {idoso.blood_type}
                  </p>
                  <p>
                    Endereço: {idoso.street}, {idoso.street_number}
                  </p>
                  <p>Bairro: {idoso.neighborhood}</p>
                  <p>Cidade: {idoso.city}</p>
                  <p>Estado: {idoso.state}</p>
                  <p>CEP: {idoso.zip_code}</p>
                  <p>Condições: {idoso.conditions ?? "N/A"}</p>
                  <p>Criado em: {formatDate(idoso.created_at)}</p>
                  <p>Atualizado em: {formatDate(idoso.updated_at)}</p>
                </div>
              ) : (
                <p>Carregando...</p>
              )
            }
          />
        </Card>
      </div>
      <div className="flex justify-center mx-auto bg-white w-full max-w-[300px] sm:max-w-none">
        <Button
          type="primary"
          onClick={() => reactToPrintFn()}
          className="my-2"
        >
          Imprimir
        </Button>
      </div>
    </div>
  );
};

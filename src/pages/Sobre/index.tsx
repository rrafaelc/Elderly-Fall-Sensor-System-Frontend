import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { Card, Typography, Divider, Row, Col } from "antd";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";

const alunos = [
  {
    nome: "Carlos Rafael da Costa",
    descricao: "Desenvolvedor Frontend e Gerente do Projeto",
    img: "images/sobre/rafaelc.jpg",
  },
  {
    nome: "Gustavo Fonseca Santos",
    descricao: "Responsável pela demonstração do sensor de queda",
    img: "images/sobre/gustavo.jpg",
  },
  {
    nome: "Iago de Oliveira Almeida",
    descricao: "Programador e responsável pela montagem do sensor com Arduino",
    img: "images/sobre/iago.jpg",
  },
  {
    nome: "Rafael Henrique Greco",
    descricao: "Desenvolvedor Frontend e Líder do Grupo",
    img: "images/sobre/rafaelg.jpeg",
  },
  {
    nome: "Rodrigo de Almeida Rodrigues",
    descricao: "Responsável pela documentação do projeto",
    img: "images/sobre/rodrigo.jpeg",
  },
  {
    nome: "Taís Bueno Vidotto",
    descricao: "Desenvolvedora Backend",
    img: "images/sobre/tais.jpeg",
  },
];

const SobrePage = () => {
  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <Stack spacing={6}>
        <Heading size="xl" textAlign="center" color="teal.600">
          Sobre o projeto Passos Seguros
        </Heading>
        <Text fontSize="lg" textAlign="center" color="gray.600">
          O projeto "Passos Seguros" foi desenvolvido por alunos da Fatec
          Itapira como parte de um desafio interdisciplinar inspirado nas 13
          Normas da ONU para 2030, focando na promoção da saúde e bem-estar. Com
          dedicação e inovação, nossa equipe criou um sensor de queda voltado
          para o monitoramento e segurança de idosos, oferecendo um meio
          confiável de alerta em casos de acidentes domésticos. Este projeto
          representa nosso compromisso em usar a tecnologia para um impacto
          positivo e alinhado aos objetivos globais.
        </Text>
        <Divider />
        <Heading
          size="lg"
          color="teal.500"
          mb={4}
          style={{ textAlign: "center" }}
        >
          Equipe de Desenvolvimento
        </Heading>
        <Box>
          <Row gutter={[16, 24]} justify="center">
            {alunos.map((aluno, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  style={{
                    width: 300,
                    textAlign: "center",
                    borderColor: "teal",
                    borderWidth: 1,
                    borderStyle: "solid",
                    height: "100%",
                  }}
                  cover={
                    <img
                      src={aluno.img}
                      alt={aluno.nome}
                      style={{
                        border: "1px solid teal",
                        width: "100%",
                        borderBottom: 'none'
                      }}
                      className="max-h-[283px]"
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <Typography.Title level={5} style={{ color: "#004d40" }}>
                        {aluno.nome}
                      </Typography.Title>
                    }
                    description={
                      <Text style={{ color: "gray.600" }}>
                        {aluno.descricao}
                      </Text>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Box>
      </Stack>
    </Page>
  );
};

export const Component = SobrePage;

export const ErrorBoundary = ErrorPageStrategy;

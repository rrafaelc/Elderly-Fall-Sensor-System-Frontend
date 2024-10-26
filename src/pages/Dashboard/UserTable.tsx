import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box } from '@chakra-ui/react';

// Defina a interface para os dados dos usuários
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Função para buscar dados do backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users'); // URL da API
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      position="fixed" // Mantém a tabela fixa no canto esquerdo
      bottom="20px" // Posição fixa em relação ao rodapé
      left={["50%", "20px"]} // Centraliza horizontalmente em telas pequenas, fixa à esquerda em grandes
      right={["50%", "auto"]} // Aplica "auto" em telas grandes e centraliza em pequenas
      transform={["translate(-50%, 0)", "none"]} // Move para o centro horizontalmente em telas pequenas
      width={["90%", "70%", "50%", "40%"]} // Largura responsiva
      maxWidth="600px"
      height={["300px", "400px", "500px"]} // Altura responsiva
      padding="4"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      zIndex="1000" // Garante que fique sobre outros elementos
    >
      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Idade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.age}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserTable;

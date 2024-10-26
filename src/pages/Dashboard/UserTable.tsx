import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box } from '@chakra-ui/react';

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
        const response = await fetch('http://localhost:8000/api/users');
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
      width={["100%", "70%", "50%", "100%"]}
      maxWidth="600px"
      height={["300px", "400px", "327px"]}
      padding="4"
      bg="white"
      boxShadow="md"
      borderRadius="md"
      overflowY="auto"
      overflowX="auto"
      margin="auto"
      border="1px solid #ddd"
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

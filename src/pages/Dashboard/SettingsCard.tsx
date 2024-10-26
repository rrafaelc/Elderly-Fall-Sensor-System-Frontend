import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Switch,
  IconButton,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { SettingsIcon, InfoIcon } from '@chakra-ui/icons';

const SettingsCard = () => {
  const [isOn, setIsOn] = useState(true);

  // Função de controle para o Switch
  const handleToggle = () => setIsOn(!isOn);

  // Dados fictícios para o idoso
  const elderlyData = {
    nome: "José Silva",
    email: "jose.silva@example.com",
    idade: 75,
    endereço: "Rua das Flores, 123",
    telefone: "(11) 98765-4321",
  };

  return (
    <Card maxW="600px" w="100%" borderWidth="1px" borderRadius="lg" boxShadow="md" padding="4" border="1px solid #ddd">
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">Informações do Idoso</Heading>
          <HStack spacing="4">
            <VStack spacing="0" align="center">
              <Switch colorScheme="teal" isChecked={isOn} onChange={handleToggle} size="sm" />
              <Text fontSize="xs" color="gray.500">{isOn ? 'Ativo' : 'Inativo'}</Text>
            </VStack>
            <IconButton
              icon={<SettingsIcon />}
              aria-label="Configurações"
              colorScheme="teal"
              variant="outline"
              size="sm"
            />
          </HStack>
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex>
          <List spacing={1} fontSize="sm" flex="1">
            <ListItem>
              <ListIcon as={InfoIcon} color="teal.500" />
              <Text as="span" fontWeight="bold">Nome:</Text> {elderlyData.nome}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} color="teal.500" />
              <Text as="span" fontWeight="bold">Email:</Text> {elderlyData.email}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} color="teal.500" />
              <Text as="span" fontWeight="bold">Idade:</Text> {elderlyData.idade} anos
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} color="teal.500" />
              <Text as="span" fontWeight="bold">Endereço:</Text> {elderlyData.endereço}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} color="teal.500" />
              <Text as="span" fontWeight="bold">Telefone:</Text> {elderlyData.telefone}
            </ListItem>
          </List>
        </Flex>
      </CardBody>

      <CardFooter justifyContent="center">
        <Text fontSize="xs" color="gray.500">Dados registrados no sistema</Text>
      </CardFooter>
    </Card>
  );
};

export default SettingsCard;

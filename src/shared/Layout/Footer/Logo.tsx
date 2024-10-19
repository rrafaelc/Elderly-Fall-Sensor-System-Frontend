import { Flex, HStack, Text, Image } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <HStack>
      <Text fontSize="lg" fontWeight="extrabold" m={0}>
      <Flex alignItems="center" gap="2" display={{ base: "left", md: "flex" }}>
        <Image
          boxSize="50px"
          objectFit="cover"
          src="/images/Logo.png"
          alt="Passos Seguros"
        />
        <Flex direction="column" align="center" display={{ base: "none", md: "flex" }}>
          <Text fontSize={12} >Passos</Text>
          <Text fontSize={12} >Seguros</Text>
        </Flex>
      </Flex>
      </Text>
    </HStack>
  );
};

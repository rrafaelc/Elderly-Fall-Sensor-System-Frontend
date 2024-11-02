import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Collapse,
  HStack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { Link, useNavigate } from "shared/Router";
import { Image } from "@chakra-ui/react";

import { useAuthStore } from "modules/auth/application";

import { DesktopNav } from "./DesktopNav";
import { LoaderBar } from "./LoaderBar";
import { MobileNav } from "./MobileNav";
import HideOnScrollNavbar from "./HideOnScrollNavbar";

export const Navbar = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <Box w="100%" position="fixed" zIndex="10">
      <HideOnScrollNavbar>
        <Flex
          w="100%"
          minH="60px"
          py={2}
          px={4}
          borderBottom={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align="center"
          bg={bg}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex flex={{ base: 5, md: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              as={Link}
              to={isAuthenticated ? "/dashboard" : "/"}
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontWeight="extrabold"
            >
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
            <Flex display={{ base: "none", md: "flex" }} alignItems="center" ml={10}>
              <DesktopNav handleCloseNav={handleLinkClick} />
            </Flex>
          </Flex>
          <HStack direction={"row"} spacing={4}>
            <SignInButton />
            <SignUpButton />
            <LogoutButton />
          </HStack>
        </Flex>
        <LoaderBar />
        <Collapse in={isOpen} animateOpacity>
          <MobileNav handleCloseNav={handleLinkClick} />
        </Collapse>
      </HideOnScrollNavbar>
    </Box>
  );
};

const SignInButton = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  if (isAuthenticated) {
    return null;
  }

  return (
    <Button fontWeight={400} variant="link" as={Link} to="/entrar">
      Entrar
    </Button>
  );
};

const SignUpButton = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  if (isAuthenticated) {
    return null;
  }

  return (
    <Button
      display={{ base: "none", md: "inline-flex" }}
      colorScheme="orange"
      onClick={() => navigate("/registrar")}
    >
      Registre-se
    </Button>
  );
};

const LogoutButton = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);
  const logout = useAuthStore((store) => store.logout);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Button
      fontWeight={400}
      variant="link"
      onClick={() => logout().then(() => navigate("/"))}
    >
      Sair
    </Button>
  );
};

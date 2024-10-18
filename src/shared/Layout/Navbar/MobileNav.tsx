import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Collapse,
  Flex,
  Icon,
  Link as ChLink,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "shared/Router";

import { INavItem } from "./INavItem";
import { useNavItems } from "./useNavItems";

interface IMobileNav {
  handleCloseNav: () => void
}

interface IMobileNavItem extends INavItem, IMobileNav {}

export const MobileNav = ({ handleCloseNav }: IMobileNav) => {
  const bg = useColorModeValue("white", "gray.800");
  const navItems = useNavItems();

  return (
    <Stack
      p={4}
      display={{ md: "none" }}
      bg={bg}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} handleCloseNav={handleCloseNav} />
      ))}
    </Stack>
  );
};

// todo: navigation: Link
const MobileNavItem = ({ label, children, href, handleCloseNav }: IMobileNavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={href ?? ""}
        justify="space-between"
        align="center"
        onClick={!children?.length ? handleCloseNav : () => {}}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight="bold"
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <ChLink
                as={Link}
                to={child.href}
                key={child.label}
                py={2}
                onClick={handleCloseNav}
              >
                {child.label}
              </ChLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

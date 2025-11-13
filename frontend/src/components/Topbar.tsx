import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';

interface TopbarProps {
  onOpen: () => void;
}

export const Topbar = ({ onOpen }: TopbarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={6}
      py={4}
      borderBottomWidth="1px"
      bg="white"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center" gap={3}>
        <IconButton
          aria-label="Ouvrir le menu"
          display={{ base: 'inline-flex', md: 'none' }}
          icon={<FiMenu />}
          onClick={onOpen}
          variant="ghost"
        />
        <Box>
          <Heading size="md" color="blue.600">
            Gestion du Parc Informatique
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Responsable Marketing, Communication & SI
          </Text>
        </Box>
      </Flex>
      <IconButton
        aria-label="Changer le thème"
        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  );
};

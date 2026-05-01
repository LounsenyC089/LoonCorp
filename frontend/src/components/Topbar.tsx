import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
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
      px={{ base: 4, md: 8 }}
      py={5}
      borderBottomWidth="1px"
      borderColor="whiteAlpha.200"
      bg="blackAlpha.400"
      backdropFilter="blur(16px)"
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
          color="white"
        />
        <Box>
          <HStack spacing={3} mb={1}>
            <Heading size="md" color="white">
              AFENIN TECHNOLOGIES
            </Heading>
            <Badge colorScheme="orange" variant="solid">
              Nouvelle expérience
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.300">
            Fiabilité IT · Performance opérationnelle · Vision stratégique
          </Text>
        </Box>
      </Flex>
      <IconButton
        aria-label="Changer le thème"
        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        onClick={toggleColorMode}
        variant="ghost"
        color="white"
      />
    </Flex>
  );
};

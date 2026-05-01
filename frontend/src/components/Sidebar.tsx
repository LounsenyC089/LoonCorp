import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  FiActivity,
  FiAlertCircle,
  FiBarChart2,
  FiCheckSquare,
  FiCpu,
  FiHome,
  FiUsers,
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Accueil', to: '/dashboard', icon: <FiHome /> },
  { label: 'Parc Informatique', to: '/equipments', icon: <FiCpu /> },
  { label: 'Audits', to: '/audits', icon: <FiBarChart2 /> },
  { label: 'Maintenance', to: '/maintenance', icon: <FiCheckSquare /> },
  { label: 'Interventions', to: '/interventions', icon: <FiAlertCircle /> },
  { label: 'Services', to: '/services', icon: <FiActivity /> },
  { label: 'Utilisateurs', to: '/users', icon: <FiUsers /> },
];

const SidebarContent = () => {
  const location = useLocation();

  return (
    <Flex
      direction="column"
      h="100%"
      bg="blackAlpha.500"
      backdropFilter="blur(16px)"
      borderRightWidth="1px"
      borderColor="whiteAlpha.200"
      p={6}
    >
      <Box mb={8}>
        <Text fontSize="xs" letterSpacing="0.25em" textTransform="uppercase" color="gray.300">
          AFENIN Technologies
        </Text>
        <HStack mt={2} spacing={3}>
          <Icon as={FiCpu} color="accent.500" boxSize={5} />
          <Text fontSize="xl" fontWeight="bold" color="white">
            Digital Ops Center
          </Text>
        </HStack>
      </Box>

      <VStack align="stretch" spacing={2}>
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.to);
          return (
            <ChakraLink
              as={Link}
              to={item.to}
              key={item.to}
              px={4}
              py={3}
              borderRadius="xl"
              display="flex"
              alignItems="center"
              gap={3}
              bg={active ? 'whiteAlpha.300' : 'transparent'}
              color={active ? 'white' : 'gray.300'}
              border="1px solid"
              borderColor={active ? 'afenin.400' : 'transparent'}
              _hover={{ textDecoration: 'none', bg: 'whiteAlpha.200', color: 'white' }}
            >
              {item.icon}
              {item.label}
            </ChakraLink>
          );
        })}
      </VStack>
    </Flex>
  );
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => (
  <>
    <Box display={{ base: 'none', md: 'block' }} w="300px">
      <SidebarContent />
    </Box>
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <SidebarContent />
      </DrawerContent>
    </Drawer>
  </>
);

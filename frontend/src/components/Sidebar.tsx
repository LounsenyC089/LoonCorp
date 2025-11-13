import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
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
  { label: 'Dashboard', to: '/dashboard', icon: <FiHome /> },
  { label: 'Parc Informatique', to: '/equipments', icon: <FiCpu /> },
  { label: 'Audits', to: '/audits', icon: <FiBarChart2 /> },
  { label: 'Maintenance Mensuelle', to: '/maintenance', icon: <FiCheckSquare /> },
  { label: 'Interventions', to: '/interventions', icon: <FiAlertCircle /> },
  { label: 'Services', to: '/services', icon: <FiActivity /> },
  { label: 'Utilisateurs', to: '/users', icon: <FiUsers /> },
];

const SidebarContent = () => {
  const location = useLocation();

  return (
    <Flex direction="column" h="100%" bg="white" borderRightWidth="1px" p={6}>
      <Text fontSize="xl" fontWeight="bold" mb={8} color="blue.600">
        LoonCorp IT Ops
      </Text>
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
              borderRadius="md"
              display="flex"
              alignItems="center"
              gap={3}
              bg={active ? 'blue.50' : 'transparent'}
              color={active ? 'blue.600' : 'gray.600'}
              fontWeight={active ? 'semibold' : 'medium'}
              _hover={{ textDecoration: 'none', bg: 'blue.50', color: 'blue.600' }}
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
    <Box display={{ base: 'none', md: 'block' }} w="260px">
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

import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const users = [
  {
    id: 1,
    nomComplet: 'Julie Berthelot',
    login: 'jberthelot',
    service: 'Marketing & Communication',
    role: 'manager',
  },
  {
    id: 2,
    nomComplet: 'Administrateur LoonCorp',
    login: 'admin',
    service: 'Systèmes d\'information',
    role: 'admin',
  },
];

export const UsersPage = () => (
  <Stack spacing={6}>
    <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between" gap={4}>
      <Heading size="lg">Utilisateurs</Heading>
      <Button colorScheme="blue">Inviter un utilisateur</Button>
    </Flex>

    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {users.map((user) => (
        <Box key={user.id} bg="white" borderRadius="lg" shadow="sm" p={6}>
          <Flex align="center" gap={4}>
            <Avatar name={user.nomComplet} />
            <Box>
              <Heading size="sm">{user.nomComplet}</Heading>
              <Text color="gray.500">{user.login}</Text>
            </Box>
            <Badge ml="auto" colorScheme={user.role === 'admin' ? 'purple' : 'blue'}>
              {user.role}
            </Badge>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>

    <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
      <Heading size="md" mb={4}>
        Liste complète
      </Heading>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Identifiant</Th>
            <Th>Service</Th>
            <Th>Rôle</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.nomComplet}</Td>
              <Td>{user.login}</Td>
              <Td>{user.service}</Td>
              <Td>
                <Badge colorScheme={user.role === 'admin' ? 'purple' : 'blue'}>{user.role}</Badge>
              </Td>
              <Td>
                <Button size="sm" variant="ghost" colorScheme="blue">
                  Modifier
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  </Stack>
);

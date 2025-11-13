import {
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
import { interventions } from '../../data/mockData';

export const InterventionsPage = () => (
  <Stack spacing={6}>
    <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between" gap={4}>
      <Heading size="lg">Interventions</Heading>
      <Button colorScheme="blue">Planifier une intervention</Button>
    </Flex>

    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Total interventions
        </Text>
        <Heading size="md">{interventions.length}</Heading>
      </Box>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          En cours
        </Text>
        <Heading size="md">
          {interventions.filter((item) => item.statut === 'En cours').length}
        </Heading>
      </Box>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Taux de résolution
        </Text>
        <Heading size="md">
          {Math.round(
            (interventions.filter((item) => item.statut === 'Terminé').length /
              interventions.length) *
              100,
          )}%
        </Heading>
      </Box>
    </SimpleGrid>

    <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
      <Heading size="md" mb={4}>
        Historique récent
      </Heading>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Equipement</Th>
            <Th>Type</Th>
            <Th>Date</Th>
            <Th>Statut</Th>
          </Tr>
        </Thead>
        <Tbody>
          {interventions.map((item) => (
            <Tr key={item.id}>
              <Td>{item.equipement}</Td>
              <Td>{item.type}</Td>
              <Td>{item.date}</Td>
              <Td>
                <Badge colorScheme={item.statut === 'Terminé' ? 'green' : 'orange'}>
                  {item.statut}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  </Stack>
);

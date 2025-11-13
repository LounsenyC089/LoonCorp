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
import { VictoryBar } from 'victory';
import { auditSummary, equipments } from '../../data/mockData';

const mockAudits = [
  {
    id: 1,
    date: '2023-12-15',
    service: 'Marketing & Communication',
    auditeur: 'Administrateur LoonCorp',
    etatGlobal: 'A surveiller',
    nonConformes: 1,
  },
  {
    id: 2,
    date: '2023-11-10',
    service: 'Systèmes d\'information',
    auditeur: 'Julie Berthelot',
    etatGlobal: 'OK',
    nonConformes: 0,
  },
];

export const AuditsPage = () => (
  <Stack spacing={6}>
    <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between" gap={4}>
      <Heading size="lg">Audits du parc informatique</Heading>
      <Button colorScheme="blue">Nouvel audit</Button>
    </Flex>

    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Taux de conformité global
        </Text>
        <Heading size="md">{Math.round(auditSummary.tauxConformite * 100)}%</Heading>
        <Text mt={2} color="gray.500">
          {auditSummary.audits} audits réalisés
        </Text>
      </Box>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Équipements non conformes
        </Text>
        <Heading size="md">{auditSummary.incidents}</Heading>
        <Text mt={2} color="orange.500">
          Priorité : licences logicielles
        </Text>
      </Box>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Equipements audités
        </Text>
        <Heading size="md">{equipments.length}</Heading>
        <Text mt={2} color="gray.500">
          Couverture multi-services
        </Text>
      </Box>
    </SimpleGrid>

    <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
      <Heading size="md" mb={4}>
        Non conformités par audit
      </Heading>
      <VictoryBar
        data={mockAudits.map((audit) => ({ x: audit.service, y: audit.nonConformes }))}
        style={{ data: { fill: '#E53E3E' } }}
        cornerRadius={4}
      />
    </Box>

    <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
      <Heading size="md" mb={4}>
        Historique des audits
      </Heading>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Service</Th>
            <Th>Auditeur</Th>
            <Th>État global</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockAudits.map((audit) => (
            <Tr key={audit.id}>
              <Td>{audit.date}</Td>
              <Td>{audit.service}</Td>
              <Td>{audit.auditeur}</Td>
              <Td>
                <Badge colorScheme={audit.etatGlobal === 'OK' ? 'green' : 'yellow'}>
                  {audit.etatGlobal}
                </Badge>
              </Td>
              <Td>
                <Button size="sm" variant="ghost" colorScheme="blue">
                  Voir le rapport
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  </Stack>
);

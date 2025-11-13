import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { equipments } from '../../data/mockData';

export const EquipmentsPage = () => {
  const [search, setSearch] = useState('');
  const [etat, setEtat] = useState('');

  const filtered = useMemo(() => {
    return equipments.filter((eq) => {
      const matchesSearch = `${eq.codeInterne} ${eq.utilisateur} ${eq.service}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesEtat = etat ? eq.etatActuel === etat : true;
      return matchesSearch && matchesEtat;
    });
  }, [search, etat]);

  return (
    <Stack spacing={6}>
      <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between" gap={4}>
        <Heading size="lg">Parc Informatique</Heading>
        <HStack spacing={3} flexWrap="wrap">
          <Button colorScheme="blue">Importer Excel</Button>
          <Button variant="outline" colorScheme="blue">
            Exporter CSV
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Nouveau matériel
          </Button>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Input
          placeholder="Rechercher par code, utilisateur ou service"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          placeholder="Filtrer par état"
          value={etat}
          onChange={(event) => setEtat(event.target.value)}
        >
          <option value="En service">En service</option>
          <option value="A vérifier">A vérifier</option>
          <option value="En maintenance">En maintenance</option>
        </Select>
        <Button variant="ghost" onClick={() => setEtat('')}>
          Réinitialiser
        </Button>
      </SimpleGrid>

      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Type</Th>
              <Th>Utilisateur</Th>
              <Th>Service</Th>
              <Th>État</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((eq) => (
              <Tr key={eq.id}>
                <Td fontWeight="medium">{eq.codeInterne}</Td>
                <Td>{eq.typePoste}</Td>
                <Td>{eq.utilisateur}</Td>
                <Td>{eq.service}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      eq.etatActuel === 'En service'
                        ? 'green'
                        : eq.etatActuel === 'A vérifier'
                        ? 'yellow'
                        : 'red'
                    }
                  >
                    {eq.etatActuel}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
};

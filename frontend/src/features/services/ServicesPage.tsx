import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Textarea,
} from '@chakra-ui/react';

const services = [
  {
    id: 1,
    nom: 'Marketing & Communication',
    description: 'Communication interne et externe, branding et campagnes digitales',
    equipements: 18,
    utilisateurs: 12,
  },
  {
    id: 2,
    nom: 'Systèmes d\'information',
    description: 'Infrastructure, sécurité et support utilisateur',
    equipements: 25,
    utilisateurs: 9,
  },
];

export const ServicesPage = () => (
  <Stack spacing={6}>
    <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between" gap={4}>
      <Heading size="lg">Services & Directions</Heading>
      <Button colorScheme="blue">Ajouter un service</Button>
    </Flex>

    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {services.map((service) => (
        <Box key={service.id} bg="white" borderRadius="lg" shadow="sm" p={6}>
          <Heading size="md" mb={2} color="blue.600">
            {service.nom}
          </Heading>
          <Textarea value={service.description} isReadOnly resize="none" mb={4} />
          <SimpleGrid columns={2} spacing={4}>
            <Stat>
              <StatLabel>Equipements</StatLabel>
              <StatNumber>{service.equipements}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Utilisateurs</StatLabel>
              <StatNumber>{service.utilisateurs}</StatNumber>
            </Stat>
          </SimpleGrid>
          <Button mt={4} size="sm" variant="outline" colorScheme="blue">
            Consulter le détail
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  </Stack>
);

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { maintenanceSummary } from '../../data/mockData';

const defaultChecklist = [
  'Vérification des mises à jour',
  'Contrôle antivirus',
  'Sauvegardes cloud',
  'Test des périphériques',
  'Nettoyage disque',
];

export const MaintenancePage = () => (
  <Stack spacing={6}>
    <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between" gap={4}>
      <Heading size="lg">Maintenance mensuelle</Heading>
      <Button colorScheme="blue">Planifier une maintenance</Button>
    </Flex>

    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Taux de réalisation
        </Text>
        <Heading size="md">{Math.round(maintenanceSummary.tauxRealisation * 100)}%</Heading>
        <Text mt={2} color="gray.500">
          {maintenanceSummary.maintenancesEnCours} maintenance en cours
        </Text>
      </Box>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Maintenances en retard
        </Text>
        <Heading size="md">{maintenanceSummary.maintenancesRetard}</Heading>
        <Text mt={2} color="orange.500">
          Relancer les équipes terrain
        </Text>
      </Box>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Text fontSize="sm" color="gray.500">
          Rapport mensuel
        </Text>
        <Heading size="md">Décembre 2023</Heading>
        <Button size="sm" mt={3} variant="outline" colorScheme="blue">
          Télécharger PDF
        </Button>
      </Box>
    </SimpleGrid>

    <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Heading size="md" mb={4}>
          Checklist standard
        </Heading>
        <Stack spacing={3}>
          {defaultChecklist.map((tache) => (
            <Checkbox key={tache} defaultChecked>
              {tache}
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Heading size="md" mb={4}>
          Alertes
        </Heading>
        <Stack spacing={3}>
          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Badge colorScheme="red">Urgent</Badge>
            <Text fontWeight="semibold" mt={2}>
              Poste LC-POSTE-002 en anomalie récurrente
            </Text>
            <Text fontSize="sm" color="gray.500">
              Vérifier les sauvegardes et l&apos;antivirus
            </Text>
          </Box>
          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Badge colorScheme="yellow">Suivi</Badge>
            <Text fontWeight="semibold" mt={2}>
              Maintenance Marketing janvier
            </Text>
            <Text fontSize="sm" color="gray.500">
              Prévoir un renfort pour les périphériques
            </Text>
          </Box>
        </Stack>
      </Box>
    </Grid>
  </Stack>
);

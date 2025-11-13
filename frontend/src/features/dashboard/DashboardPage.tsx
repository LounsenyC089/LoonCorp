import {
  Badge,
  Box,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { VictoryPie, VictoryTheme, VictoryBar } from 'victory';
import { auditSummary, equipments, maintenanceSummary, interventions } from '../../data/mockData';
import { formatPercent } from '../../utils/format';

export const DashboardPage = () => {
  const equipmentByStatus = equipments.reduce<Record<string, number>>((acc, eq) => {
    acc[eq.etatActuel] = (acc[eq.etatActuel] || 0) + 1;
    return acc;
  }, {});

  return (
    <Stack spacing={6}>
      <Heading size="lg">Vue d&apos;ensemble</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box p={6} bg="white" borderRadius="lg" shadow="sm">
          <Text fontSize="sm" color="gray.500">
            Taux de conformité audit
          </Text>
          <Heading size="md">{formatPercent(auditSummary.tauxConformite)}</Heading>
          <Badge mt={2} colorScheme="green">
            {auditSummary.audits} audits réalisés
          </Badge>
        </Box>
        <Box p={6} bg="white" borderRadius="lg" shadow="sm">
          <Text fontSize="sm" color="gray.500">
            Maintenances du mois
          </Text>
          <Heading size="md">{formatPercent(maintenanceSummary.tauxRealisation)}</Heading>
          <Text mt={2} color="orange.500">
            {maintenanceSummary.maintenancesRetard} en retard
          </Text>
        </Box>
        <Box p={6} bg="white" borderRadius="lg" shadow="sm">
          <Text fontSize="sm" color="gray.500">
            Equipements inventoriés
          </Text>
          <Heading size="md">{equipments.length}</Heading>
          <Text mt={2} color="blue.500">
            {interventions.length} interventions récentes
          </Text>
        </Box>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <GridItem bg="white" borderRadius="lg" shadow="sm" p={6}>
          <Heading size="md" mb={4}>
            Répartition des équipements par état
          </Heading>
          <VictoryPie
            data={Object.entries(equipmentByStatus).map(([etat, count]) => ({
              x: etat,
              y: count,
            }))}
            colorScale={['#4CAF50', '#FFC107', '#F44336', '#2196F3']}
            innerRadius={80}
            labels={({ datum }) => `${datum.x}\n${datum.y}`}
            style={{ labels: { fill: '#2D3748', fontSize: 12 } }}
            theme={VictoryTheme.material}
          />
        </GridItem>
        <GridItem bg="white" borderRadius="lg" shadow="sm" p={6}>
          <Heading size="md" mb={4}>
            Incidents par type
          </Heading>
          <VictoryBar
            data={interventions.map((item) => ({ x: item.type, y: item.id }))}
            style={{ data: { fill: '#3182CE' } }}
            cornerRadius={4}
            animate
          />
        </GridItem>
      </Grid>

      <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
        <Heading size="md" mb={4}>
          Interventions récentes
        </Heading>
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
          {interventions.map((intervention) => (
            <Box key={intervention.id} borderWidth="1px" borderRadius="md" p={4}>
              <Text fontWeight="semibold">{intervention.equipement}</Text>
              <Text fontSize="sm" color="gray.500">
                {intervention.type}
              </Text>
              <Text fontSize="sm">{intervention.date}</Text>
              <Badge mt={2} colorScheme={intervention.statut === 'Terminé' ? 'green' : 'orange'}>
                {intervention.statut}
              </Badge>
            </Box>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

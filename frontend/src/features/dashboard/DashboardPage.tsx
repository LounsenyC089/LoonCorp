import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { VictoryBar, VictoryPie, VictoryTheme } from 'victory';
import { auditSummary, equipments, interventions, maintenanceSummary } from '../../data/mockData';
import { formatPercent } from '../../utils/format';

export const DashboardPage = () => {
  const equipmentByStatus = equipments.reduce<Record<string, number>>((acc, eq) => {
    acc[eq.etatActuel] = (acc[eq.etatActuel] || 0) + 1;
    return acc;
  }, {});

  return (
    <Stack spacing={8}>
      <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="3xl" p={{ base: 6, md: 10 }} bg="whiteAlpha.100">
        <Text textTransform="uppercase" letterSpacing="0.2em" fontSize="xs" color="gray.300">
          AFENIN Technologies · Plateforme Pilotage
        </Text>
        <Heading mt={3} size="2xl" maxW="4xl" lineHeight="1.15" color="white">
          Une interface premium inspirée studio digital pour orchestrer votre parc IT, vos audits et vos interventions.
        </Heading>
        <Text mt={4} maxW="3xl" color="gray.300">
          Cette nouvelle direction visuelle modernise l&apos;univers AFENIN avec un style immersif, éditorial et orienté performance.
        </Text>
        <HStack mt={6} spacing={4}>
          <Button colorScheme="orange" size="md">Découvrir les modules</Button>
          <Button variant="outline" borderColor="whiteAlpha.400" color="white">Explorer variantes couleurs</Button>
        </HStack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box p={6} bg="whiteAlpha.100" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.300">
          <Text fontSize="sm" color="gray.300">Taux de conformité audit</Text>
          <Heading mt={1} size="lg" color="white">{formatPercent(auditSummary.tauxConformite)}</Heading>
          <Badge mt={3} colorScheme="green">{auditSummary.audits} audits réalisés</Badge>
        </Box>
        <Box p={6} bg="whiteAlpha.100" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.300">
          <Text fontSize="sm" color="gray.300">Maintenances du mois</Text>
          <Heading mt={1} size="lg" color="white">{formatPercent(maintenanceSummary.tauxRealisation)}</Heading>
          <Text mt={3} color="orange.300">{maintenanceSummary.maintenancesRetard} en retard</Text>
        </Box>
        <Box p={6} bg="whiteAlpha.100" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.300">
          <Text fontSize="sm" color="gray.300">Équipements inventoriés</Text>
          <Heading mt={1} size="lg" color="white">{equipments.length}</Heading>
          <Text mt={3} color="blue.200">{interventions.length} interventions récentes</Text>
        </Box>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} gap={6}>
        <GridItem bg="whiteAlpha.100" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.300" p={6}>
          <Heading size="md" mb={4} color="white">Répartition des équipements</Heading>
          <VictoryPie
            data={Object.entries(equipmentByStatus).map(([etat, count]) => ({ x: etat, y: count }))}
            colorScale={['#34D399', '#F59E0B', '#EF4444', '#60A5FA']}
            innerRadius={80}
            labels={({ datum }) => `${datum.x}\n${datum.y}`}
            style={{ labels: { fill: '#E2E8F0', fontSize: 12 } }}
            theme={VictoryTheme.material}
          />
        </GridItem>
        <GridItem bg="whiteAlpha.100" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.300" p={6}>
          <Heading size="md" mb={4} color="white">Incidents par type</Heading>
          <VictoryBar
            data={interventions.map((item) => ({ x: item.type, y: item.id }))}
            style={{ data: { fill: '#f59f00' }, labels: { fill: '#E2E8F0' } }}
            cornerRadius={5}
            animate
          />
        </GridItem>
      </Grid>
    </Stack>
  );
};

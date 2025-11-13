import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { EquipmentsPage } from '../features/equipments/EquipmentsPage';
import { AuditsPage } from '../features/audits/AuditsPage';
import { MaintenancePage } from '../features/maintenance/MaintenancePage';
import { InterventionsPage } from '../features/interventions/InterventionsPage';
import { ServicesPage } from '../features/services/ServicesPage';
import { UsersPage } from '../features/users/UsersPage';

const App = () => {
  const disclosure = useDisclosure();

  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
      <Flex direction="column" flex="1">
        <Topbar onOpen={disclosure.onOpen} />
        <Box as="main" flex="1" p={6} overflowY="auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/equipments" element={<EquipmentsPage />} />
            <Route path="/audits" element={<AuditsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/interventions" element={<InterventionsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;

export const equipments = [
  {
    id: 1,
    numeroAffichage: '001',
    codeInterne: 'LC-POSTE-001',
    typePoste: 'PC Portable',
    marque: 'Dell',
    modele: 'Latitude 7420',
    etatActuel: 'En service',
    service: 'Marketing & Communication',
    utilisateur: 'Julie Berthelot',
  },
  {
    id: 2,
    numeroAffichage: '002',
    codeInterne: 'LC-POSTE-002',
    typePoste: 'iMac',
    marque: 'Apple',
    modele: 'iMac 24"',
    etatActuel: 'A vérifier',
    service: 'Communication',
    utilisateur: 'Lucas Moreau',
  },
];

export const auditSummary = {
  tauxConformite: 0.82,
  incidents: 12,
  audits: 4,
};

export const maintenanceSummary = {
  tauxRealisation: 0.75,
  maintenancesEnCours: 1,
  maintenancesRetard: 1,
};

export const interventions = [
  {
    id: 1,
    equipement: 'LC-POSTE-001',
    type: 'Maintenance préventive',
    date: '2023-12-12',
    statut: 'Terminé',
  },
  {
    id: 2,
    equipement: 'LC-POSTE-002',
    type: 'Incidence critique',
    date: '2023-12-20',
    statut: 'En cours',
  },
];

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const marketing = await prisma.service.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nom: 'Marketing & Communication',
      description: 'Communication interne et externe',
    },
  });

  const si = await prisma.service.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nom: 'Systèmes d\'information',
      description: 'Support et infrastructure',
    },
  });

  const adminPassword = await bcrypt.hash('Admin#2024', 10);

  const admin = await prisma.utilisateur.upsert({
    where: { login: 'admin' },
    update: {},
    create: {
      nomComplet: 'Administrateur LoonCorp',
      login: 'admin',
      email: 'admin@looncorp.com',
      role: 'admin',
      passwordHash: adminPassword,
      serviceId: si.id,
    },
  });

  const userPassword = await bcrypt.hash('User#2024', 10);

  const julie = await prisma.utilisateur.upsert({
    where: { login: 'jberthelot' },
    update: {},
    create: {
      nomComplet: 'Julie Berthelot',
      login: 'jberthelot',
      email: 'julie.berthelot@looncorp.com',
      role: 'manager',
      passwordHash: userPassword,
      serviceId: marketing.id,
    },
  });

  const laptop = await prisma.equipement.upsert({
    where: { codeInterne: 'LC-POSTE-001' },
    update: {},
    create: {
      numeroAffichage: '001',
      codeInterne: 'LC-POSTE-001',
      typePoste: 'PC Portable',
      marque: 'Dell',
      modele: 'Latitude 7420',
      systemeExploitation: 'Windows 11 Pro',
      memoire: '16 Go',
      propriete: 'Propriété LoonCorp',
      dateAcquisition: new Date('2023-01-15'),
      dateInventaire: new Date('2023-10-01'),
      etatActuel: 'En service',
      processeur: 'Intel i7',
      disqueDur: '512 Go SSD',
      peripheriques: 'Dock, écran 27"',
      remarques: 'Poste pour campagnes digitales',
      contratMaintenance: 'Dell ProSupport 2025',
      misesAJourHebdo: true,
      ageCalcule: 1,
      serviceId: marketing.id,
      utilisateurId: julie.id,
    },
  });

  await prisma.intervention.createMany({
    data: [
      {
        equipementId: laptop.id,
        type: 'Maintenance préventive',
        origine: 'Interne',
        date: new Date('2023-11-05'),
        description: 'Nettoyage logiciel et suppression des fichiers temporaires',
        cout: 80,
        technicien: 'Equipe support SI',
        statut: 'termine',
      },
      {
        equipementId: laptop.id,
        type: 'Intervention urgente',
        origine: 'Utilisateur',
        date: new Date('2023-12-12'),
        description: 'Remplacement chargeur',
        cout: 35,
        technicien: 'Prestataire DELL',
        statut: 'termine',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.audit.create({
    data: {
      dateAudit: new Date('2023-12-15'),
      auditeurId: admin.id,
      serviceConcerneId: marketing.id,
      nombreIncidents: 4,
      equipementsNonConformes: 1,
      etatGlobal: 'A surveiller',
      synthese: 'Conformité globale satisfaisante, attention aux licences',
      recommandations: 'Mettre à jour les antivirus et renégocier les licences Adobe',
      auditEquipements: {
        create: [
          {
            equipementId: laptop.id,
            conformiteMateriel: 'OK',
            conformiteLogiciel: 'A revoir',
            conformiteSecurite: 'OK',
            observations: 'Licence Adobe Creative Cloud expirée',
          },
        ],
      },
    },
  });

  await prisma.maintenanceMensuelle.create({
    data: {
      mois: 12,
      annee: 2023,
      datePlanifiee: new Date('2023-12-05'),
      dateEffective: new Date('2023-12-08'),
      realiseParId: admin.id,
      statut: 'termine',
      observationsGenerales: 'Maintenance complète réalisée',
      checks: {
        create: [
          {
            tache: 'Vérification des mises à jour système',
            categorie: 'Système',
            statut: 'termine',
          },
          {
            tache: 'Contrôle antivirus',
            categorie: 'Sécurité',
            statut: 'termine',
            commentaire: 'Base virale à jour',
          },
          {
            tache: 'Contrôle intégrité disques',
            categorie: 'Stockage',
            statut: 'termine',
          },
        ],
      },
    },
  });

  console.log('🌱 Base de données initialisée avec succès');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

# LoonCorp IT Management Suite

Solution full-stack pour la gestion du parc informatique, des audits et de la maintenance mensuelle de LoonCorp. L&apos;application s&apos;adresse à un Responsable Marketing, Communication & Système d&apos;Information et fournit une expérience moderne, responsive et orientée métier.

## Architecture

```
.
├── backend/   # API NestJS + Prisma (PostgreSQL/SQLite)
├── frontend/  # SPA React + Chakra UI + Vite
├── docs/      # Documentation complémentaire
```

### Stack technique
- **Backend** : Node.js 20, NestJS 10, Prisma ORM, Swagger, JWT
- **Base de données** : PostgreSQL (SQLite possible en dev)
- **Frontend** : React 18 + TypeScript, Vite, Chakra UI, React Query, Zustand, Victory Charts
- **Tests** : Jest + Supertest (backend)

## Mise en route rapide

### Prérequis
- Node.js >= 18
- npm >= 9
- PostgreSQL ou SQLite

### Variables d&apos;environnement
Copier le fichier `.env.example` et adapter les valeurs :

```
cp .env.example .env
```

### Installation des dépendances

```bash
cd backend
npm install
npm run prisma:generate
cd ../frontend
npm install
```

### Initialiser la base de données

```bash
cd backend
npm run prisma:migrate -- --name init
npm run prisma:seed
```

### Lancer l&apos;API

```bash
npm run start:dev
```
L&apos;API est accessible sur http://localhost:4000 (Swagger : http://localhost:4000/docs).

### Lancer le frontend

```bash
cd ../frontend
npm run dev
```
L&apos;interface est accessible sur http://localhost:5173.

## Fonctionnalités clés

- Gestion complète des équipements (CRUD, filtres, recherche, interventions associées)
- Module d&apos;audit (formulaire structuré, suivi des conformités, dashboards)
- Module de maintenance mensuelle (checklist, workflow, alertes, rapports)
- Tableaux de bord consolidés avec graphiques
- Authentification JWT et rôles basiques
- Scripts d&apos;import/export (placeholders à enrichir)

## Tests

```bash
cd backend
npm test
npm run test:e2e
```

## Scripts utiles

| Commande | Description |
| --- | --- |
| `npm run start:dev` | Démarrer l&apos;API NestJS en mode watch |
| `npm run build` | Compiler le backend |
| `npm run prisma:migrate` | Lancer les migrations Prisma |
| `npm run prisma:seed` | Alimenter la base avec des données de démonstration |
| `npm run dev` (frontend) | Lancer l&apos;interface web |
| `npm run lint` (frontend/back) | Vérifier la qualité du code |

## Documentation

Des guides complémentaires sont disponibles dans le dossier `docs/` (architecture, API, UI). Complétez-les selon les évolutions du projet.

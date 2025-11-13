# Architecture applicative

## Vue d&apos;ensemble

- **Frontend** : SPA React hébergée séparément, communique via API REST.
- **Backend** : NestJS modularisé avec Prisma pour l&apos;accès base de données.
- **Base de données** : PostgreSQL (ou SQLite pour développement rapide).

## Modules backend

| Module | Description |
| --- | --- |
| Auth | Authentification JWT, stratégies et guards |
| Services | Gestion des services/directions |
| Users | Gestion des utilisateurs et rôles |
| Equipments | Inventaire des équipements, dashboard, filtres |
| Interventions | Historique et statistiques des interventions |
| Audits | Création, suivi et dashboards des audits |
| Maintenance | Workflow de maintenance mensuelle |

## Flux principaux

1. **Connexion** : `/auth/login` retourne un JWT stocké côté client (sessionStorage).
2. **Gestion équipements** : endpoints REST CRUD + agrégations `dashboard/summary`.
3. **Audits** : création via POST `/audits` avec liste d&apos;équipements contrôlés.
4. **Maintenance** : checklist mensuelle via `/maintenance`, calcul des indicateurs.

## Sécurité & bonnes pratiques
- Helmet + rate limiting (Throttler) activés.
- Validation des DTOs via `class-validator`.
- Swagger généré automatiquement (`/docs`).
- Tests Jest pour couverture minimale.

## Frontend
- Chakra UI pour les composants, thème brand custom.
- React Query pour la synchronisation avec l&apos;API (mockée actuellement).
- Zustand pour l&apos;authentification.
- Graphiques avec Victory Charts.

## Déploiement
- Conteneurs Docker recommandés : `docker-compose.yml` (à créer) pour orchestrer API, frontend et base de données.
- CI/CD : pipeline à définir (lint + tests + build).

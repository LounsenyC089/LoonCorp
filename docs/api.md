# Documentation API

## Authentification
- `POST /auth/login` : retourne `{ access_token, user }`
  - Body : `{ login, password }`
  - Exemple : `admin / Admin#2024`

## Services
- `GET /services`
- `POST /services`
- `GET /services/:id`
- `PUT /services/:id`
- `DELETE /services/:id`

## Utilisateurs
- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

## Equipements
- `GET /equipments?serviceId=&etat=` : liste filtrée
- `POST /equipments`
- `GET /equipments/:id`
- `PUT /equipments/:id`
- `DELETE /equipments/:id`
- `GET /equipments/dashboard/summary` : agrégats (totaux, par état/service)

## Interventions
- `GET /interventions?equipementId=&statut=&from=&to=`
- `POST /interventions`
- `PUT /interventions/:id`
- `DELETE /interventions/:id`
- `GET /interventions/stats/summary`

## Audits
- `GET /audits`
- `POST /audits` : payload avec `equipements` (liste de conformités)
- `GET /audits/:id`
- `PUT /audits/:id`
- `DELETE /audits/:id`
- `GET /audits/dashboard`

## Maintenance mensuelle
- `GET /maintenance`
- `POST /maintenance`
- `GET /maintenance/:id`
- `PUT /maintenance/:id`
- `DELETE /maintenance/:id`
- `GET /maintenance/dashboard`

## Santé
- `GET /health` : vérifie que l&apos;API répond

> Toutes les routes (hors login) nécessitent un header `Authorization: Bearer <token>`.

# Guide UI

## Principes UX
- Navigation latérale par modules métier
- Palette bleue/anthracite, badges couleurs (vert/jaune/rouge)
- Composants responsives (mobile/desktop)

## Pages
- **Dashboard** : cartes KPI + graphiques (répartition états, incidents)
- **Parc informatique** : table filtrable + actions d&apos;import/export
- **Audits** : cartes synthétiques + histogramme + historique
- **Maintenance** : cards indicateurs + checklist + alertes
- **Interventions** : statistiques + tableau
- **Services/Utilisateurs** : cartes synthèses + tables

## Composants clés
- `Sidebar` : navigation, mode drawer sur mobile
- `Topbar` : switch thème clair/sombre, branding
- `StatusBadge` (à créer) : badge couleur selon état
- `DataCard` (à factoriser) : pattern card KPI

## Responsiveness
- Breakpoints Chakra `base`, `md`, `lg`
- Grids adaptatives (`SimpleGrid`, `Grid`)

## Accessibilité
- Contraste respecté (Chakra + thème)
- Icônes avec label (`aria-label`)
- Navigation clavier (Chakra)

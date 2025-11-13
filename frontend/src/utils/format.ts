export const formatPercent = (value: number) => `${(value * 100).toFixed(0)}%`;

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(value));

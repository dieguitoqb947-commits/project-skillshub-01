export const SUPPORTED_CURRENCIES = [
  'USD',
  'ARS',
  'BRL',
  'CAD',
  'CLP',
  'COP',
  'CRC',
  'EUR',
  'MXN',
  'PEN',
  'UYU',
] as const;

export const FRANKFURTER_API_URL = `https://api.frankfurter.dev/v2/rates?base=USD&quotes=${SUPPORTED_CURRENCIES.filter((code) => code !== 'USD').join(',')}`;
export const ITEMS_PER_PAGE = 6;
export const SKILL_CATEGORIES = ['Tecnología', 'Idiomas', 'Diseño', 'Negocios'] as const;
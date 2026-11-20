import type { CurrencyCode } from '../types';

const LOCAL_CURRENCY_BY_COUNTRY: Record<string, CurrencyCode> = {
  Argentina: 'ARS',
  Brasil: 'BRL',
  Canadá: 'CAD',
  Chile: 'CLP',
  Colombia: 'COP',
  'Costa Rica': 'CRC',
  Ecuador: 'USD',
  España: 'EUR',
  México: 'MXN',
  Perú: 'PEN',
  Uruguay: 'UYU',
};

const ZERO_DECIMAL_CURRENCIES = new Set<CurrencyCode>(['ARS', 'CLP', 'COP', 'CRC']);

export const currencyFromLocation = (location: string): CurrencyCode => {
  const country = location.split(',').at(-1)?.trim() ?? '';
  return LOCAL_CURRENCY_BY_COUNTRY[country] ?? 'USD';
};

export const formatMoney = (amount: number, currency: CurrencyCode) =>
  new Intl.NumberFormat('es', {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    maximumFractionDigits: ZERO_DECIMAL_CURRENCIES.has(currency) ? 0 : 2,
  }).format(amount);

export const toUsd = (amount: number, currency: CurrencyCode, rate: number) =>
  currency === 'USD' ? amount : amount / rate;

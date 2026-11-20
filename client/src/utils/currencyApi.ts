import { FRANKFURTER_API_URL, SUPPORTED_CURRENCIES } from './constants';
import type { CurrencyCode, CurrencyRates, ExchangeRateQuote } from '../types';

const QUOTES = SUPPORTED_CURRENCIES.filter(
  (code): code is Exclude<CurrencyCode, 'USD'> => code !== 'USD',
);

export const fetchExchangeRates = async (): Promise<CurrencyRates> => {
  try {
    const res = await fetch(FRANKFURTER_API_URL);
    if (!res.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data: ExchangeRateQuote[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid response format');
    }

    const rates = {
      USD: 1,
      ARS: 0,
      BRL: 0,
      CAD: 0,
      CLP: 0,
      COP: 0,
      CRC: 0,
      EUR: 0,
      MXN: 0,
      PEN: 0,
      UYU: 0,
    } satisfies CurrencyRates;

    for (const quote of data) {
      if (QUOTES.includes(quote.quote) && Number.isFinite(quote.rate)) {
        rates[quote.quote] = quote.rate;
      }
    }

    const missing = QUOTES.filter((code) => rates[code] <= 0);
    if (missing.length > 0) {
      throw new Error(`Missing exchange rates: ${missing.join(', ')}`);
    }

    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { CurrencyCode, CurrencyRates, ExchangeRateQuote } from '../types';
import { fetchExchangeRates } from '../utils/currencyApi';

type CurrencyContextValue = {
  currencyCode: CurrencyCode;
  setCurrencyCode: (code: CurrencyCode) => void;
  rates: CurrencyRates | null;
  quotes: ExchangeRateQuote[];
  isLoading: boolean;
  error: string | null;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');
  const [quotes, setQuotes] = useState<ExchangeRateQuote[]>([]);
  const [rates, setRates] = useState<CurrencyRates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadExchangeRates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchExchangeRates();

        if (!isCancelled) {
          setRates(response.rates);
          setQuotes(response.quotes);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Error al obtener las tasas de cambio',
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadExchangeRates();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <CurrencyContext.Provider
      value={{ currencyCode, setCurrencyCode, rates, quotes, isLoading, error }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error('useCurrency debe usarse dentro de CurrencyProvider');
  }

  return context;
};

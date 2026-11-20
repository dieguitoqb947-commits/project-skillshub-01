import { FRANKFURTER_API_URL } from "./constants";
import type { CurrencyRates } from "../types";
import type { ExchangeRateResponse } from "../types";



export const fetchExchangeRates = async () : Promise<CurrencyRates> => {
    try {
        const res = await fetch(FRANKFURTER_API_URL);
        if(!res.ok) {
            throw new Error('Failed to fetch exchange rates');
        }

        const data: ExchangeRateResponse = await res.json();
        if(!data.rates) {
            throw new Error('Invalid response format');
        }
        return {
            USD: 1,
            ...data.rates,
        }

    }catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
    }
}
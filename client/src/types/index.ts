export type CurrencyCode = 'USD' | 'COP' | 'EUR' | 'MXN';

export type SkillCategory = 'Tecnología' | 'Idiomas' | 'Diseño' | 'Negocios';

export type CurrencyRates = Record<CurrencyCode, number>;

export interface SkillAuction {
    id: string;
    title: string;
    category: SkillCategory;
    startingBid: number;
    currentBid: number;
    description: string;
    mentorName: string;
    duration: number;
    endsAt: string;
}

export interface ExchangeRateResponse {
    base: CurrencyCode;
    date: string;
    rates: CurrencyRates;
}
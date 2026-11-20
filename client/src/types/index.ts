export type CurrencyCode = 'USD' | 'COP' | 'EUR' | 'MXN';

export type SkillCategory = 'Tecnología' | 'Idiomas' | 'Diseño' | 'Negocios';

export type CurrencyRates = Record<CurrencyCode, number>;

export interface TalentProfile {
  id: string;
  roleTitle: string;
  category: SkillCategory;
  baseCompensation: number;
  summary: string;
  fullName: string;
  availability: string;
  availableFrom: string;
  location: string;
  experienceYears: number;
  keySkills: string[];
  portfolioUrl?: string;
}

export interface ExchangeRateResponse {
  base: CurrencyCode;
  date: string;
  rates: Omit<CurrencyRates, 'USD'>;
}

export type TalentFilterState = {
  query: string;
  category: SkillCategory | '';
  location: string;
};
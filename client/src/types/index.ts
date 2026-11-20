export type CurrencyCode =
  | 'USD'
  | 'ARS'
  | 'BRL'
  | 'CAD'
  | 'CLP'
  | 'COP'
  | 'CRC'
  | 'EUR'
  | 'MXN'
  | 'PEN'
  | 'UYU';

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

export interface ExchangeRateQuote {
  date: string;
  base: string;
  quote: Exclude<CurrencyCode, 'USD'>;
  rate: number;
}

export type TalentFilterState = {
  query: string;
  category: SkillCategory | '';
  location: string;
};
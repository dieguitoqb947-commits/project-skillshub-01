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
  currency: CurrencyCode;
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

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export interface AuthUser {
  userId: string;
  name: string;
  email: string;
}

export type SigninData = {
  token: string;
  userId: string;
  name: string;
  email: string;
}

export type SignupData = AuthUser;

export type ErrorResponse = {
  message: string;
}


export interface CurrentUser {
  name: string;
  email: string;
}

export interface CurrentUserWithToken extends CurrentUser {
  token: string;
}

export interface Offer {
  _id: string;
  owner: string;
  talentId: string;
  talentName: string;
  offeredAmountUsd: number;
  floorUsd: number;
}

export interface CreateOfferInput {
  talentId: string;
  talentName: string;
  offeredAmountUsd: number;
  floorUsd: number;
}



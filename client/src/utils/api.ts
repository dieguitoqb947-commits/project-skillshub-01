import type { SignupCredentials, UserCredentials } from "../interfaces/UserData";
import type {
  ApiResponse,
  AuthUser,
  CurrentUser,
  ErrorResponse,
  SigninData,
  SignupData,
  Offer,
  CreateOfferInput,
} from "../types";


export class AuthApiError extends Error {
    readonly status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.name = "AuthApiError";
      this.status = status;
    }
  }


const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Falta VITE_API_URL");
}

const AUTH_API_URL = apiUrl;


async function authRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${AUTH_API_URL.replace(/\/$/, '')}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if(!response.ok){
       const body = (await response.json().catch(() => null)) as ErrorResponse | null;
       const message = body?.message || `Error ${response.status}`;
       throw new AuthApiError(response.status, message);
    }
      
    return (await response.json()) as T;
  }


export async function validateToken(token: string): Promise<CurrentUser> {
    const response = await authRequest<ApiResponse<CurrentUser>>("/users/me", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data;
}

export async function getCurrentUser(token: string): Promise<CurrentUser> {
    return validateToken(token);
}

export async function signin(credentials: UserCredentials ): Promise<SigninData> {
    const response = await authRequest<ApiResponse<SigninData>>('/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
    return response.data;
}

export async function signup(credentials: SignupCredentials): Promise<AuthUser> {
    const response = await authRequest<ApiResponse<SignupData>>('/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
    return response.data;
}

export async function getOffers(token: string): Promise<Offer[]> {
  const response = await authRequest<ApiResponse<{ offers: Offer[] }>>('/offers', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.offers;
}
export async function createOffer(token: string, input: CreateOfferInput): Promise<Offer> {
  const response = await authRequest<ApiResponse<{ offer: Offer }>>('/offers', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
  return response.data.offer;
}
export async function deleteOffer(token: string, offerId: string): Promise<Offer> {
  const response = await authRequest<ApiResponse<Offer>>(`/offers/${offerId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}



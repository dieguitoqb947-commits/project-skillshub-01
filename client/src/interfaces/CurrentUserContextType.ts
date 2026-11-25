import type { CurrentUserWithToken } from "../types";

import type { UserCredentials } from "./UserData";
import type { SignupCredentials } from "./UserData";

export interface CurrentUserContextType {
    currentUser: CurrentUserWithToken | null;
    isLoading: boolean;
    signIn: (credentials: UserCredentials) => Promise<void>;
    signUp: (credentials: SignupCredentials) => Promise<void>;
    signOut: () => void;
}


import { createContext, useContext, useState, useEffect, type ReactNode} from "react"
import type { CurrentUserContextType } from "../interfaces/CurrentUserContextType"
import type { CurrentUserWithToken } from "../types";
import { getCurrentUser, signin as signinApi, signup as signupApi } from "../utils/api";
import type { UserCredentials, SignupCredentials } from "../interfaces/UserData";


const CurrentUserContext = createContext<CurrentUserContextType | null>(null);



export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUserWithToken | null>(null);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        let isCancelled = false;

        const restoreSession = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const user = await getCurrentUser(token);

                if (!isCancelled) {
                    setCurrentUser({
                        name: user.name,
                        email: user.email,
                        token,
                    });
                }
            } catch {
                localStorage.removeItem("token");

                if (!isCancelled) {
                    setCurrentUser(null);
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        void restoreSession();

        return () => {
            isCancelled = true;
        };
    }, []);


    const signIn = async (credentials: UserCredentials) => {
        const data = await signinApi(credentials);

        localStorage.setItem("token", data.token);
        setCurrentUser({
            name: data.name,
            email: data.email,
            token: data.token,
        });
    };

    const signUp = async (credentials: SignupCredentials) => {
        await signupApi(credentials);
        await signIn({
            email: credentials.email,
            password: credentials.password,
        });
    };

    const signOut = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    return (
        <CurrentUserContext.Provider
            value={{ currentUser, isLoading, signIn, signUp, signOut }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};



export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    if (!context) {
        throw new Error("useCurrentUser debe usarse dentro de CurrentUserProvider");
    }
    return context;
}



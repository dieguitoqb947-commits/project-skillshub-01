export interface UserCredentials {
    password: string
    email: string
}

export interface SignupCredentials extends UserCredentials {
    name: string
}
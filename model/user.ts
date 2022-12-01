import { AuthStatus } from "../enums/auth_state";

export interface User{
    uid: string,
    authStatus: AuthStatus
}

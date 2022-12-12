import { AuthStatus } from '../enums/auth_state';
import { User } from '../model/user';

interface AuthHandler {
  login(username: string, password: string): Promise<User | null>;
}

class OAuthHandler implements AuthHandler {
  async login(username: string, password: string): Promise<User | null> {
    //TODO: Implement OAuth login
    console.log('OAuth login');
    return { authStatus: AuthStatus.LoggedIn } as User;
  }
}

export const AuthLogic: AuthHandler = new OAuthHandler();

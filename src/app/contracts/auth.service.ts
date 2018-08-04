export abstract class AuthService {
  abstract authenticated: boolean;
  abstract login(userName: string, password: string): Promise<boolean>;
  abstract logout(): Promise<void>;
  abstract getUserInfo(): Promise<string>;
}

import { AuthService } from '../../contracts';
import { IdentityInfo } from '../../models';

export class LocalAuthService extends AuthService {
  private static readonly uNameKey = 'uName';
  private static readonly uPasswordKey = 'uPassword';

  private identityInfo?: IdentityInfo;

  get authenticated() {
    return !!this.identityInfo;
  }

  constructor() {
    super();
    if (window.localStorage.getItem(LocalAuthService.uNameKey) != null) {
      this.identityInfo = {
        userName: window.localStorage.getItem(LocalAuthService.uNameKey)
      };
    }
  }

  login(userName: string, password: string) {
    this.identityInfo = {
      userName
    };

    window.localStorage.setItem(LocalAuthService.uNameKey, userName);
    window.localStorage.setItem(LocalAuthService.uPasswordKey, password);

    return Promise.resolve(true);
  }

  logout() {
    window.localStorage.removeItem(LocalAuthService.uNameKey);
    window.localStorage.removeItem(LocalAuthService.uPasswordKey);

    return Promise.resolve();
  }

  getUserInfo(): Promise<string> {
    if (!this.authenticated) {
      throw new Error('User is not authentiticated.');
    }

    return Promise.resolve(this.identityInfo!.userName);
  }

  private throwIfNotAuthenticated() {
    if (!this.authenticated) {
      throw new Error('User is not authentiticated.');
    }
  }
}

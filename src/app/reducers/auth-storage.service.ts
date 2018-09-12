export class AuthStorageService {
  private static readonly uNameKey = 'uName';
  private static readonly tokenKey = 'token';

  constructor() { }

  getInfo() {
    const userName = window.localStorage.getItem(AuthStorageService.uNameKey);
    const token = window.localStorage.getItem(AuthStorageService.tokenKey);

    const contains = !!userName && !!token;

    return contains ?
      { userName, token } :
      undefined;
  }

  setInfo(userName: string, token: string) {
    this.cleanUp();

    window.localStorage.setItem(AuthStorageService.uNameKey, userName);
    window.localStorage.setItem(AuthStorageService.tokenKey, token);
  }

  cleanUp() {
    window.localStorage.removeItem(AuthStorageService.uNameKey);
    window.localStorage.removeItem(AuthStorageService.tokenKey);
  }
}

import { Observable } from 'rxjs';

interface ColdObservable<T = any> extends Observable<T> {
  getValue(): T;
}

export abstract class AuthService {
  get authenticated() {
    return this.authenticated$.getValue();
  }
  abstract authenticated$: ColdObservable<boolean>;

  userInfo$: ColdObservable<string | undefined>;
  abstract getUserInfo(): Promise<string>;

  abstract login(userName: string, password: string): Promise<boolean>;
  abstract logout(): Promise<void>;
}

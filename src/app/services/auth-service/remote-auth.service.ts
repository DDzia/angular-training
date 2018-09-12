import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../../contracts';
import { AppState } from '../../reducers';
import { AuthAction } from '../../actions';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoteAuthService extends AuthService {
  userInfo$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(@Inject('remoteHost') private readonly remoteHost: string,
              private readonly http: HttpClient,
              private readonly store: Store<AppState>) {
    super();

    store.select((state) => state.authInfo)
    .pipe(
      map((x) => x ? x.userName : undefined)
    )
    .subscribe(this.userInfo$);
  }

  async login(userName: string, password: string) {
    const url = `${this.remoteHost}/auth/login`;

    try {
      const response = await this.http.post<any>(
        url,
        { login: userName, password }
      )
      .toPromise();

      const token = response.token as string;

      this.store.dispatch({
        type: AuthAction.logined,
        payload: {
          userName,
          token
        }
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  async logout() {
    this.store.dispatch({ type: AuthAction.logouted });
  }

  async getUserInfo() {
    if (!this.userInfo$.getValue()) {
      throw new Error('User is not authentiticated.');
    }

    try {
      const url = `${this.remoteHost}/auth/userinfo`;
      return (await this.http.post<any>(url, null).toPromise()).login as string;
    } catch {
      throw new Error('User is not authentiticated.');
    }
  }
}

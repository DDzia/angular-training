import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../../contracts';
import { OverlayService } from '../overlay';
import { AppState } from '../../reducers';
import { AuthAction } from '../../actions';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoteAuthService extends AuthService {
  userInfo$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(@Inject('remoteHost') private readonly remoteHost: string,
              private readonly http: HttpClient,
              private readonly store: Store<AppState>,
              private readonly overlay: OverlayService) {
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
      this.overlay.visible$.next(true);

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
    } finally {
      this.overlay.visible$.next(false);
    }
  }

  async logout() {
    try {
      this.overlay.visible$.next(true);
      this.store.dispatch({ type: AuthAction.logouted });
    } finally {
      this.overlay.visible$.next(false);
    }
  }

  async getUserInfo() {
    if (!this.userInfo$.getValue()) {
      throw new Error('User is not authentiticated.');
    }

    try {
      this.overlay.visible$.next(true);

      const url = `${this.remoteHost}/auth/userinfo`;
      return (await this.http.post<any>(url, null).toPromise()).login as string;
    } catch {
      throw new Error('User is not authentiticated.');
    } finally {
      this.overlay.visible$.next(false);
    }
  }
}

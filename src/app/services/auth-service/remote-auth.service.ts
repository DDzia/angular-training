import { Injectable, Inject } from '@angular/core';

import { AuthService } from '../../contracts';
import { HttpClient } from '@angular/common/http';
import { AuthStorageService } from '../auth-storage';
import { BehaviorSubject } from 'rxjs';
import { OverlayService } from '../overlay';

@Injectable()
export class RemoteAuthService extends AuthService {
  authenticated$ = new BehaviorSubject(false);
  userInfo$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(@Inject('remoteHost') private readonly remoteHost: string,
              private readonly http: HttpClient,
              private authStore: AuthStorageService,
              private readonly overlay: OverlayService) {
    super();

    const info = authStore.getInfo();

    if (info) {
      this.userInfo$.next(info.userName);
      this.authenticated$.next(true);
    }
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

      this.authStore.setInfo(userName, token);

      this.userInfo$.next(userName);
      this.authenticated$.next(true);

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
      this.authStore.cleanUp();

      this.authenticated$.next(false);
      this.userInfo$.next(undefined);
    } finally {
      this.overlay.visible$.next(false);
    }
  }

  async getUserInfo() {
    if (!this.authenticated) {
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

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthStorageService } from '../auth-storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly authStore: AuthStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const info = this.authStore.getInfo();

    const hasToken = !!info;
    if (hasToken) {
      const newReq = req.clone({
        setHeaders: {
          Authorization: info.token
        }
      });

      return next.handle(newReq);
    }

    return next.handle(req);
  }
}

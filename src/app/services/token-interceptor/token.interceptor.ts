import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthStorageService } from '../../reducers/auth-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const info = new AuthStorageService().getInfo();

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

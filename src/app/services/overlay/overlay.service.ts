import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class OverlayService {
  public readonly visible$ = new BehaviorSubject(false);
}

@Injectable()
export class OverlayInterceptor implements HttpInterceptor {
  private counter = 0;

  constructor(private readonly srv: OverlayService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
   if (!this.counter++) {
     this.toggleOverlay();
   }

    return next.handle(req)
    .pipe(
      tap(() => {
        this.counter--;
        if (!this.counter) {
          this.toggleOverlay();
        }
      })
    );
  }

  private toggleOverlay() {
    const oldValue = this.srv.visible$.getValue();
    this.srv.visible$.next(!oldValue);
  }
}

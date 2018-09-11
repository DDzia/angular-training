import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class OverlayService {
  public static readonly instance = new OverlayService();

  public readonly visible$ = new BehaviorSubject(false);

  private constructor() {}
}

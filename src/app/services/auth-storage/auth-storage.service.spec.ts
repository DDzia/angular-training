import { TestBed, inject } from '@angular/core/testing';

import { AuthStorageService } from './auth-storage.service';

describe('AuthStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStorageService]
    });
  });

  it('should be created', inject([AuthStorageService], (service: AuthStorageService) => {
    expect(service).toBeTruthy();
  }));
});

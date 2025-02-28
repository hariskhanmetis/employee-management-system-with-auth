import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authchildGuard } from './authchild.guard';

describe('authchildGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authchildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

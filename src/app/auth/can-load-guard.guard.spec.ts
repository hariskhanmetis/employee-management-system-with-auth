import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canLoadGuardGuard } from './can-load-guard.guard';

describe('canLoadGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canLoadGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

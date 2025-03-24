import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authunsavedGuard } from './authunsaved.guard';

describe('authunsavedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authunsavedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

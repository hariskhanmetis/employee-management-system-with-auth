import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unsavedGuard } from './unsaved.guard';

describe('unsavedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unsavedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

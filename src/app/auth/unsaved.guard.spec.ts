import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { unsavedChangesGuard } from './unsaved.guard'; 

describe('unsavedChangesGuard', () => { 
  const executeGuard: CanDeactivateFn<any> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters)); 
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

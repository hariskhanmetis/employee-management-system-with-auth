import { TestBed } from '@angular/core/testing';

import { LocalApiInterceptor } from './local-api.interceptor';

describe('LocalApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LocalApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LocalApiInterceptor = TestBed.inject(LocalApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

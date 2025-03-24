import { CanActivateFn } from '@angular/router';

export const authunsavedGuard: CanActivateFn = (route, state) => {
  return true;
};

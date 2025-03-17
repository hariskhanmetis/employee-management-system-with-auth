import { CanActivateChildFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authchildGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if (authService.isLoggedIn.value === true) {
    return true;
  } else {
    router.navigate(['/login']);
    snackBar.open('You should login first!', 'Close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
    return false;
  }
};

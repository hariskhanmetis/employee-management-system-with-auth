import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if(authService.isLoggedIn.value===true) {
    return true;
  } else {
    router.navigate(['/login']);
    snackBar.open('You should login first!', 'Close', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'});
    return false;
  }

};

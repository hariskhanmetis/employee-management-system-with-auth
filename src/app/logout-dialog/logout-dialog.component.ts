import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LogoutDialogComponent>
  ) {}

  onLogout(): void {
    console.log('Logout button clicked');
    this.authService.logout().subscribe(() => {
      console.log('Logout successful, closing dialog');
      this.dialogRef.close(true);
    });
  }
}

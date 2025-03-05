import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor (
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '270px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Logout", result);
        console.log('Logout dialog closed, proceeding with logout');
        this.snackBar.open('Logout Successful!', 'Close', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        this.router.navigate(['/login']);
      }
      else {
        console.log('Logout cancelled');
      }
    });
  }

  onLogout() {
    this.openDialog('250ms', '250ms');
  }
}

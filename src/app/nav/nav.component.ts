import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  notifications: string[] = [];
  currentDate: Date = new Date();
  @Output() toggleDrawer = new EventEmitter<void>();

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
  }

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

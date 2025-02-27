import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) { }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}

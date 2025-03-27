import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-http-errors',
  templateUrl: './http-errors.component.html',
  styleUrls: ['./http-errors.component.css']
})
export class HttpErrorsComponent {
  constructor (
    public dialogRef: MatDialogRef<HttpErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}

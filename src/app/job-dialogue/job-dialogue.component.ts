import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-job-dialogue',
  templateUrl: './job-dialogue.component.html',
  styleUrls: ['./job-dialogue.component.css']
})
export class JobDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<JobDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

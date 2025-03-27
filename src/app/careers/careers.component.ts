import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Job } from '../models/job.model';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogueComponent } from '../job-dialogue/job-dialogue.component';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  jobs: Job[] = [];
  isLoading: boolean = true;

  constructor(
    private jobsService: JobsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  openDialog(job: Job): void {
    this.dialog.open(JobDialogueComponent, {
      width: '750px',
      data: job,
      autoFocus: false
    });
  }
}

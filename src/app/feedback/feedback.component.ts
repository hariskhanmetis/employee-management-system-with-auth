import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from '../models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  feedbacks: Feedback[] = [];
  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private snackBar: MatSnackBar) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      feedback: ['', Validators.required]
    });
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      this.feedbackService.addFeedback(this.feedbackForm.value).subscribe(() => {
        this.feedbackForm.reset();
        this.snackBar.open('Feedback submitted successfully!', 'Close', {
          duration: 2000
        });
      });
      this.getfeedbacks();
    }
  }

  getfeedbacks() {
    this.feedbackService.getFeedback().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
    });
  }

  ngOnInit(): void {
    this.getfeedbacks();
  }

  ngAfterViewInit(): void {
    this.getfeedbacks();
  }
}

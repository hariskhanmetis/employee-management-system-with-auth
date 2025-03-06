import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Admin } from '../models/admin.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  hide = true;
  infoForm!: FormGroup;
  user: Admin [] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserInfo(); 
    this.infoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getUserInfo() {
    this.http.get<any>('http://localhost:3000/admins/') 
      .subscribe(
        (data) => {
          this.user = data;
          this.infoForm.patchValue({
            email: this.user.email
          });
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
  }

  // Update account information
  updateAccount() {
    if (this.infoForm.invalid) {
      return;
    }

    const updatedData = {
      email: this.infoForm.value.email,
      password: this.infoForm.value.newPassword // Update password
    };

    this.http.put(`http://localhost:3000/users/${this.user.id}`, updatedData)
      .subscribe(
        () => {
          this.snackBar.open('Account updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/employee-details']);
        },
        (error) => {
          console.error('Error updating account:', error);
          this.snackBar.open('Error updating account. Try again!', 'Close', { duration: 3000 });
        }
      );
  }
}

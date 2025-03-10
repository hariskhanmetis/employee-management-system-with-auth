import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Admin } from '../models/admin.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  hide = true;
  infoForm!: FormGroup;
  user!: Admin;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.getLoggedInUser().subscribe(admin => {
      if (admin) {
        this.user = admin;
        this.infoForm.patchValue({ email: admin.email });
      }
    });
  }

  updateAccount() {
    if (this.infoForm.invalid) {
      return;
    }

    const updatedData = {
      email: this.infoForm.value.email,
      password: this.infoForm.value.newPassword
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

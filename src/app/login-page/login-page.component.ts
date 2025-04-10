import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(32)])],
      rememberMe: [false]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(32)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(32)])]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;

      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Remember Me:', rememberMe);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      this.authService.login(email, password).subscribe(success => {
        if (success) {
          this.router.navigate(['employee']);
          this.snackBar.open('Login Successful!', 'Close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' });
        } else {
          this.snackBar.open('Please Enter Valid Credentials!', 'Close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      });
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.snackBar.open('Passwords do not match!', 'Close', { duration: 3000 });
        return;
      }

      this.authService.register(email, password).subscribe(success => {
        if (success) {
          this.router.navigate(['login']);
          this.snackBar.open('User registered successfully, login now!', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  canDeactivate(): boolean {
    if (this.registerForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

}
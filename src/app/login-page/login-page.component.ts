import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(32)])]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log("Login", this.loginForm.valid);
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(success => {
        if (success) {
          this.router.navigate(['/employee-table']);
          this.snackBar.open('Login Successful!', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Please Enter Valid Credentials!', 'Close', { duration: 3000 });
        }
      });
    }
  }

}

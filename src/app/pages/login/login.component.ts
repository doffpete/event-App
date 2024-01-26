import { NgIf } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;
  loginForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private FormBuilder: FormBuilder,
    private auth: SupabaseService,
    private router: Router
  ) {
    this.loginForm = this.FormBuilder.group({
      email: FormBuilder.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
      password: FormBuilder.control('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    const snackBarRef = this._snackBar.open(
      'User Email or Password Does Not Exist',
      'close',
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      }
    );
  }

  public onSubmit() {
    this.loading = true;
    this.auth
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        if (res.data.user?.role === 'authenticated') {
          localStorage.setItem(
            'access_token',
            JSON.stringify(res.data.session?.access_token)
          );
          this.router.navigate(['/first-page']);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } else {
          this.openSnackBar();
        }
      })
      .catch((err) => {})
      .finally(() => {
        this.loading = false;
      });
  }
}

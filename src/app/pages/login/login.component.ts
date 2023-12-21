import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Router } from '@angular/router';

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
        }
      })
      .catch((err) => {})
      .finally(() => {
        this.loading = false;
      });
  }
}

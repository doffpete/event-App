import { LoginComponent } from '../login/login.component';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private FormBuilder: FormBuilder,
    private auth: SupabaseService,
    private router: Router
  ) {
    this.registerForm = this.FormBuilder.group({
      name: FormBuilder.control('', [
        Validators.required,
      ]),

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
      .signUp(this.registerForm.value.email, this.registerForm.value.password)
      .then((res) => {
        if (res.data.user?.role === 'authenticated') {
          this.router.navigate(['/login']);
        }
      })
      .catch((err) => {})
      .finally(() => {
        this.loading = false;
      });
  }
}

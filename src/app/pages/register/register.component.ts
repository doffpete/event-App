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
      firstName: FormBuilder.control('', [Validators.required]),

      lastName: FormBuilder.control('', [Validators.required]),

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
        this.auth
          .createUserProfile(
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            this.registerForm.value.email
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(this.auth);
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

import { EventService } from './../../../services/event.service';
import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  createEventForm!: FormGroup;
  loading = false;
  constructor(
    private FormBuilder: FormBuilder,
    private auth: SupabaseService,
    private router: Router,
    private eventService: EventService
  ) {
    this.createEventForm = this.FormBuilder.group({
      eventName: this.FormBuilder.control('', [Validators.required]),
      eventVenue: this.FormBuilder.control('', [Validators.required]),
      totalTickets: this.FormBuilder.control('', [Validators.required]),
      startDate: this.FormBuilder.control('', [Validators.required]),
      endDate: this.FormBuilder.control('', [Validators.required]),
      eventTime: this.FormBuilder.control('', [Validators.required]),
    });
  }

  onSubmit() {
    this.loading = true;
    this.eventService.createEvent(this.createEventForm.value);
    this.router.navigate(['/first-page']);
  }

 
}

import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { EventService } from './../../../services/event.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
  ],

  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  createEventForm!: FormGroup;
  loading = false;
  constructor(
    public dialog: MatDialog,
    private FormBuilder: FormBuilder,
    private auth: SupabaseService,
    private router: Router,
    private eventService: EventService,
    private dialogRef: DialogRef<string>
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

  async onSubmit() {
    this.loading = true;
    const result = await this.eventService.createEvent(
      this.createEventForm.value
    );

    try {
      this.dialogRef.close('success');
    }
    catch (error) {

    }
  }
}

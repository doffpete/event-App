import { Component, EventEmitter, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {
  BookEventInterface,
  EventInterface,
  EventResponseInterface,
} from '../../model/event.interface';
import { EventService } from '../../../services/event.service';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-book-ticket-sub-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './book-ticket-sub-modal.component.html',
  styleUrl: './book-ticket-sub-modal.component.css',
})
export class BookTicketSubModalComponent {
  bookEventForm!: FormGroup;
  event!: EventInterface;

  constructor(
    public dialog: MatDialog,
    private FormBuilder: FormBuilder,
    private auth: SupabaseService,
    private eventService: EventService,
    public dialogRef: MatDialogRef<BookTicketSubModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventResponseInterface
  ) {
    console.log(data);

    this.bookEventForm = this.FormBuilder.group({
      eventId: this.FormBuilder.control(data.id),
      firstName: this.FormBuilder.control('', [Validators.required]),
      lastName: this.FormBuilder.control('', [Validators.required]),
    });
  }

  reload = new EventEmitter();

  async onSubmit() {
    await this.eventService
      .createBookEventData(this.bookEventForm.value)
      .then(() => {
        this.onBookTicket();
      });
    console.log(this.bookEventForm.value);
  }

  async onBookTicket() {
    this.eventService
      .bookTicket(this.data)
      .then(() => {
        this.reload.emit();
        alert('you have booked a ticket!!');
        
      })
      .catch(() => {
        alert('An error occured!');
      });
    this.dialogRef.close();
  }
}

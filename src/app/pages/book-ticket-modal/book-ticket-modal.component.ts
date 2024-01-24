import { Component, EventEmitter, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {
  EventInterface,
  EventResponseInterface,
} from '../../model/event.interface';
import { EventService } from '../../../services/event.service';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-book-ticket-modal',
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
    MatSnackBarModule,
  ],
  templateUrl: './book-ticket-modal.component.html',
  styleUrl: './book-ticket-modal.component.css',
})
export class BookTicketModalComponent {
  bookEventForm!: FormGroup;
  event!: EventInterface;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private FormBuilder: FormBuilder,
    private auth: SupabaseService,
    private eventService: EventService,
    public dialogRef: MatDialogRef<BookTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventResponseInterface
  ) {
    console.log(data);

    this.bookEventForm = this.FormBuilder.group({
      eventId: this.FormBuilder.control(data.id),
      firstName: this.FormBuilder.control('', [Validators.required]),
      lastName: this.FormBuilder.control('', [Validators.required]),
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  reload = new EventEmitter();

  async onSubmit() {
    await this.eventService
      .createBookEventData(this.bookEventForm.value)
      .then(() => {
        this.onBookTicket();
      });
    console.log(this.bookEventForm.value);
  }
  openSnackBar() {
    this._snackBar.open('You have booked a ticket!!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  async onBookTicket() {
    this.eventService
      .bookTicket(this.data)
      .then(() => {
        this.reload.emit();
        this.openSnackBar();
      })
      .catch(() => {
        alert('An error occured!');
      });
    this.dialogRef.close();
  }
}

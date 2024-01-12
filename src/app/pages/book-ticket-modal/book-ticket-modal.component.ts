// import { SupabaseService } from '../../../services/supabase.service';
// import { Component, EventEmitter, Inject } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { DialogRef } from '@angular/cdk/dialog';
// import { EventService } from '../../../services/event.service';
// import { EventResponseInterface } from '../../model/event.interface';

// import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-book-ticket-modal',
//   standalone: true,
//   imports: [MatButtonModule, MatDialogModule],
//   templateUrl: './book-ticket-modal.component.html',
//   styleUrl: './book-ticket-modal.component.css',
// })
// export class BookTicketModalComponent {
//   event!: EventResponseInterface;

//   constructor(
//     private eventService: EventService,
//     private dialogRef: DialogRef<BookTicketModalComponent>,
//     private auth: SupabaseService,
//     @Inject(MAT_DIALOG_DATA) public data: EventResponseInterface
//   ) {}

//   reload = new EventEmitter();

//   async onBookTicket() {
//     this.eventService
//       .bookTicket(this.data)
//       .then(() => {
//         this.reload.emit();
//         alert('you have booked a ticket!!');
//       })
//       .catch(() => {
//         alert('An error occured!');
//       });
//     this.dialogRef.close();

//   }
// }

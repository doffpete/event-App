import { SupabaseService } from './../../../services/supabase.service';
import { Component, EventEmitter, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef } from '@angular/cdk/dialog';
import { EventService } from './../../../services/event.service';
import { EventResponseInterface } from '../../model/event.interface';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-ticket-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './purchase-ticket-modal.component.html',
  styleUrl: './purchase-ticket-modal.component.css',
})
export class PurchaseTicketModalComponent {
  event!: EventResponseInterface;

  constructor(
    private eventService: EventService,
    private dialogRef: DialogRef<PurchaseTicketModalComponent>,
    private auth: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: EventResponseInterface
  ) {}

  reload = new EventEmitter();

  async onPurchaseTicket() {
    this.eventService
      .purchaseTicket(this.data)
      .then(() => {
        this.dialogRef.close();
        this.reload.emit();
        alert('you have booked a ticket!!');
      })
      .catch(() => {
        alert('An error occured!');
      });
  }
}

import { DialogRef } from '@angular/cdk/dialog';
import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { EventResponseInterface } from '../../model/event.interface';
import { SupabaseService } from '../../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookTicketSubModalComponent } from '../book-ticket-sub-modal/book-ticket-sub-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-ticket-purchase',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './event-ticket-purchase.component.html',
  styleUrl: './event-ticket-purchase.component.css',
})
export class EventTicketPurchaseComponent implements OnInit {
  event!: EventResponseInterface;
  id!: number;
  buttonDisabled: boolean | undefined;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private eventService: EventService,
    private supabaseService: SupabaseService
  ) {}

  async getEventById() {
    const data = this.route.snapshot.params['id'];
    this.event = await this.eventService.getEventById(data);
    console.log(this.event);
  }

  ngOnInit() {
    this.getEventById();
  }

  openBookTicketSubModal() {
    if (this.event.no_of_tickets_sold === this.event.no_tickets) {
      alert('Sorry This Ticket is sold out ');
    } else {
      const dialogRef = this.dialog.open(BookTicketSubModalComponent, {
        data: this.event,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getEventById();
      });
    }
  }
}

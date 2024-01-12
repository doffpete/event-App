import { Component } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { IDialogData } from '../first-page/first-page.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { EventService } from '../../../services/event.service';
import { EventResponseInterface } from '../../model/event.interface';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-action-modal',
  standalone: true,
  imports: [ClipboardModule, CommonModule],
  templateUrl: './action-modal.component.html',
  styleUrl: './action-modal.component.css',
})
export class ActionModalComponent {

  constructor(
    private auth: SupabaseService,
    private eventService: EventService,
    public dialog: MatDialog,
    private clipboard: Clipboard
  ) {}

  event!: EventResponseInterface;
  uniqueLink!: string;
  filteredEvents!: EventResponseInterface[];
  events!: EventResponseInterface[];

  purchaseTicketRoute = 'event-ticket-purchase';

  async getEvents() {
    await this.eventService.getUserEvents().then((res) => {
      console.log(res);
      this.events = res;
      this.filteredEvents = res;
    });
  }

  openDialog(dialogOptions: IDialogData) {
    const options: MatDialogConfig = {
      width: '400px',
      disableClose: true,
      data: dialogOptions,
    };

    let modal: MatDialogRef<any>;

    switch (dialogOptions.action) {
      case 'deleteEvent':
        modal = this.dialog.open(DeleteModalComponent, options);
        modal.afterClosed().subscribe((result) => {
          this.getEvents();
          console.log(result);
        });
        break;
      case 'linkEvent':
        console.info('');
        break;
      default:
        break;
    }
  }

  constructEventLink(eventId:any) {
    const link = `${window.location.origin}/${this.purchaseTicketRoute}/${eventId}`;
    this.uniqueLink = link;
  }

  copyEventLink() {
    return this.clipboard.copy(this.uniqueLink);
  }
}

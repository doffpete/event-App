import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { NewEventModalComponent } from '../new-event-modal/new-event-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { IDialogData } from '../first-page/first-page.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  BookedEventResponseInterface,
  EventResponseInterface,
} from '../../model/event.interface';
import { EventService } from '../../../services/event.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [ClipboardModule, MatMenuModule, CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent implements OnInit {
  constructor(
    private clipboard: Clipboard,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getBookedTicketByUsers();
    this.getRandomColorForCard();
  }

  randomColor!: string;

  bookedTicketsByUsers!: BookedEventResponseInterface[];

  purchaseTicketRoute = 'event-ticket-purchase';
  uniqueLink!: string;

  @Input() event!: EventResponseInterface;

  @Output() reloadAllEvents = new EventEmitter();

  displayNote() {}

  getBookedTicketByUsers() {
    this.eventService.getBookedTickets(this.event.id).then((res) => {
      this.bookedTicketsByUsers = res;
      
    });
  }

  

  copyEventLink(eventId: string) {
    const link = `${window.location.origin}/${this.purchaseTicketRoute}/${eventId}`;
    this.uniqueLink = link;

    return this.clipboard.copy(this.uniqueLink);
  }

  getRandomColorForCard() {
    const eventCardColorsArray = [
      '#00FFFF',
      '#FF00FF',
      '#FF0080',
      '#FF8000',
      '#B2D732',
      '#347C98',
      '#8000FF',
    ];
    const randomColor =
      eventCardColorsArray[
        Math.floor(Math.random() * eventCardColorsArray.length)
      ];
    this.randomColor = randomColor;
  }

  openDialog(dialogOptions: IDialogData) {
    const options: MatDialogConfig = {
      width: '400px',
      disableClose: true,
      data: dialogOptions,
    };

    let modal: MatDialogRef<any>;

    switch (dialogOptions.action) {
      case 'createEvent':
        modal = this.dialog.open(NewEventModalComponent, options);
        break;
      case 'deleteEvent':
        modal = this.dialog.open(DeleteModalComponent, options);
        modal.afterClosed().subscribe((result) => {
          this.reloadAllEvents.emit();
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
}

import {
  EventInterface,
  EventResponseInterface,
} from './../../model/event.interface';
import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModelGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';
import { ModalComponent } from '../modal/modal.component';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatTooltipModule,
    ClipboardModule,
  ],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css',
})
export class FirstPageComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private route: Router,
    private auth: SupabaseService,
    public dialog: MatDialog,
    private clipboard: Clipboard
  ) {}

  filteredEvents!: EventResponseInterface[];

  events!: EventResponseInterface[];
  async getEvents() {
    await this.eventService.getUserEvents().then((res) => {
      console.log(res);
      this.events = res;
      this.filteredEvents = res;
    });
  }

  ngOnInit() {
    this.getEvents();
    // console.log(window);
  }

  logout() {
    this.auth
      .signOut()
      .then((res) => {
        this.route.navigate(['/home']);
        this.auth.removeSessionFromLocalStorage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchEvents(searchText: string) {
    const trimmedQuery = searchText.trim().toLowerCase();
    const filteredEvents = this.events.filter((event) =>
      event.event_name.toLowerCase().includes(trimmedQuery)
    );
    this.filteredEvents = filteredEvents;
  }

  openCreateEventModal() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getEvents();
    });
  }

  uniqueLink!: string;

  purchaseTicketRoute = 'event-ticket-purchase';

  constructEventLink(eventId: any) {
    const link = `${window.location.origin}/${this.purchaseTicketRoute}/${eventId}`;
    this.uniqueLink = link;
  }

  copyEventLink() {
    return this.clipboard.copy(this.uniqueLink);
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
        modal = this.dialog.open(ModalComponent, options);
        break;
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

  openDeleteEventDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DeleteModalComponent);
  }
}

export interface IDialogData {
  action: string;
  modal: string; 
  extradata: unknown;
  callToAction?: {
    question: string;
    submitButton: {
      label: string;
      color: string;
    };
    cancelButton: {
      label: string;
      color: string;
    };
  };
}

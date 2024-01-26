import { EventResponseInterface } from './../../model/event.interface';
import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';
import { NewEventModalComponent } from '../new-event-modal/new-event-modal.component';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { ActionModalComponent } from '../action-modal/action-modal.component';

import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-first-page',
  standalone: true,
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatTooltipModule,
    ClipboardModule,
    MatButtonModule,
    MatMenuModule,
    EventCardComponent,
  ],
})
export class FirstPageComponent implements OnInit {
  userData: any;
  constructor(
    private eventService: EventService,
    private route: Router,
    private auth: SupabaseService,
    public dialog: MatDialog,
    private clipboard: Clipboard
  ) {}

  sortEvents!: EventResponseInterface[];
  filteredEvents!: EventResponseInterface[];
  purchaseTicketRoute = 'event-ticket-purchase';
  uniqueLink!: string;
  events!: EventResponseInterface[];

  searchText = '';

  async getEvents() {
    await this.eventService.getUserEvents().then((res) => {
      this.events = res;
      this.filteredEvents = res;
    });
  }

  ngOnInit() {
    this.userData = this.auth.getSessionFromLocalStorage();
    this.getEvents();
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

  sortEventsByTime() {
    const sortByTime = this.events.sort((a: any, b: any): any => {
      if (a.event_time < b.event_time) {
        return -1;
      } else if (a.event_time > b.event_time) {
        return 1;
      } else {
        return 0;
      }
    });

    this.sortEvents = sortByTime;
  }

  sortEventsByStartDate() {
    const sortByStartDate = this.events.sort((a: any, b: any): any => {
      if (a.start_date < b.start_date) {
        return -1;
      } else if (a.start_date > b.start_date) {
        return 1;
      } else {
        return 0;
      }
    });

    this.sortEvents = sortByStartDate;
  }

  sortEventsByEndDate() {
    const sortByEndDate = this.events.sort((a: any, b: any): any => {
      if (a.end_date < b.end_date) {
        return -1;
      } else if (a.end_date > b.end_date) {
        return 1;
      } else {
        return 0;
      }
    });

    this.sortEvents = sortByEndDate;
  }

  searchEvents(searchText: string) {
    const trimmedQuery = searchText.trim().toLowerCase();
    const filteredEvents = this.events.filter((event) =>
      event.event_name.toLowerCase().includes(trimmedQuery)
    );
    this.filteredEvents = filteredEvents;
  }

  openCreateEventModal() {
    const dialogRef = this.dialog.open(NewEventModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getEvents();
    });
  }

  openActionModal() {
    const dialogRef = this.dialog.open(ActionModalComponent);
  }

  constructEventLink(eventId: any) {
    const link = `${window.location.origin}/${this.purchaseTicketRoute}/${eventId}`;
    this.uniqueLink = link;
  }

  copyEventLink() {
    return this.clipboard.copy(this.uniqueLink);
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

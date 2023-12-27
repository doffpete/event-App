import { EventResponseInterface } from './../../model/event.interface';
import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environment/environment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css',
})
export class FirstPageComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private route: Router,
    private auth: SupabaseService,
    public dialog: MatDialog
  ) {}
  events!: EventResponseInterface[];
  async getEvents() {
    await this.eventService.getUserEvents().then((res) => {
      console.log(res);
      this.events = res;
    });
  }

  ngOnInit() {
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

  openCreateEventModal() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  purchaseTicketRoute = 'event-ticket-purchase';

  constructEventLink(eventId: string) {
    console.log(`${environment.baseURL}${this.purchaseTicketRoute}/${eventId}`);
    return `${environment.baseURL}${this.purchaseTicketRoute}/${eventId}`;
  }

  openDialog(dialogOptions: IDialogData) {
    const options: MatDialogConfig = {
      width: '400px',
      disableClose: true, 
      data: dialogOptions
    }

    let modal: MatDialogRef<any>;

    switch(dialogOptions.action) {
      case 'createEvent':
        modal = this.dialog.open(ModalComponent, options);
        break;
      case 'deleteEvent':
        modal = this.dialog.open(DeleteModalComponent, options);
        break;
      case 'linkEvent':
        console.info('');
        break;
      default:
        break;
    }

  }

  // afterModalIsClosed(modal) {
  //   console.info('modal is closed');
  // }

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
    },
    cancelButton: {
      label: string;
      color: string;
    }
  }
}

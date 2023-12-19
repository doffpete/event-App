import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventResponseInterface } from '../../model/event.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css',
})
export class EventsPageComponent implements OnInit {
  constructor(private eventService: EventService, private router: Router) {}
  events!: EventResponseInterface[];
  async getEvents() {
    await this.eventService.getUserEvents().then((res) => {
      console.log(res);
      this.events = res;
    });
  }

  ngOnInit() {
    console.log('boy');
    this.getEvents();
  }
}

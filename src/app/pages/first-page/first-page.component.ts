import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventResponseInterface } from '../../model/event.interface';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';

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
    private auth: SupabaseService
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
}

import {
  EventInterface,
  EventResponseInterface,
} from './../app/model/event.interface';
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private supabase: SupabaseService) {}

  userProfile() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  async createEvent(event: EventInterface): Promise<EventInterface> {
    const user = this.userProfile();
    const supabase = this.supabase.supabaseClient;
    const { data, error } = await supabase
      .from('events')
      .insert({
        user_id: user.id,
        event_name: event.eventName,
        start_date: event.startDate,
        end_date: event.endDate,
        no_tickets: event.totalTickets,
        venue: event.eventVenue,
        event_time: event.eventTime,
      })
      .select();

    if (error) {
      console.log(error);
      return error as unknown as EventInterface;
    }

    return data as unknown as EventInterface;
  }

  async getUserEvents(): Promise<EventResponseInterface[]> {
    const user = this.userProfile();
    const supabase = this.supabase.supabaseClient;
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.log(error);
      return error as unknown as EventResponseInterface[];
    }

    return data as unknown as EventResponseInterface[];
  }
}

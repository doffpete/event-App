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

  async createEvent(event: EventInterface): Promise<void> {
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
      throw new Error(error.message);
    }
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

  async deleteUserEvent(eventId: string) {
    const supabase = this.supabase.supabaseClient;
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);
    if (error) {
      console.log(error);
      return error as unknown as EventResponseInterface[];
    }

    return data as unknown as EventResponseInterface[];
  }

  async getEventById(eventId: string) {
    const supabase = this.supabase.supabaseClient;
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
    if (error) {
      console.log(error);
      return error as unknown as EventResponseInterface;
    }

    return data as unknown as EventResponseInterface;
  }

  async purchaseTicket(event: EventResponseInterface) {
    const supabase = this.supabase.supabaseClient;
    const { data, error } = await supabase
      .from('events')
      .update({ no_of_tickets_sold: event.no_of_tickets_sold + 1 })
      .eq('id', event.id);
    if (error) {
      console.log(error);
      return error as unknown as EventResponseInterface;
    }

    return data as unknown as EventResponseInterface;
  }
}

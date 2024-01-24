import {
  BookEventInterface,
  BookedEventResponseInterface,
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

  // getTotalNumberOfEventsPerUserId() {
  //   const supabase = this.supabase.supabaseClient;
  //   const { data, count } =  supabase
  // .from('events')
  // .select('*', { count: 'exact' })
  // }


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


  //  getCount = await supabase
  //  .from('events')
  // .select('user_id', const FetchOptions:any(count: CountOption.exact))
  // .eq('type', 'concept')
  // .select();

  

  async createBookEventData(event: BookEventInterface): Promise<void> {
    const supabase = this.supabase.supabaseClient;
    const { data, error } = await supabase
      .from('booked_tickets')
      .insert({
        event_id: event.eventId,
        first_name: event.firstName,
        last_name: event.lastName,
      })
      .select();

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getBookedTickets(eventID:string): Promise<BookedEventResponseInterface[]> {

    const supabase = this.supabase.supabaseClient;
    const { data, error } = await supabase
      .from('booked_tickets')
      .select('*')
      .eq('event_id', eventID ); 

    if (error) {
      console.log(error);
      return error as unknown as BookedEventResponseInterface[];
    }

    return data as unknown as BookedEventResponseInterface[];
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

  async bookTicket(event: EventResponseInterface) {
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

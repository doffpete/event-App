export interface EventInterface {
  eventName: string;
  eventVenue: string;
  totalTickets: number;
  startDate: string | null;
  endDate: string | null;
  eventTime: Date;
}

export interface EventResponseInterface {
  id: string;
  created_at?: string;
  user_id?: string;
  event_name: string;
  start_date: string | null;
  end_date: string | null;
  no_tickets: number;
  venue: string;
  event_time: string;
  no_of_tickets_sold: number;
}

export interface BookEventInterface {
  firstName: string;
  lastName: string;
  eventId: string;
}

export interface BookedEventResponseInterface {
  id : string;
  event_id: string;
  first_name: string;
  last_name : string;
}
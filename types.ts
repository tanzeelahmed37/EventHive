
export type Role = 'user' | 'organizer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  totalTickets: number;
  ticketsSold: number;
  imageUrl: string;
  organizerId: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  purchaseDate: string;
}

export interface Attendee {
  userId: string;
  name: string;
  email: string;
}

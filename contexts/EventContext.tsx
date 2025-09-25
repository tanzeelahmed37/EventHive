
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { Event, Ticket, User, Attendee } from '../types';
import { MOCK_EVENTS } from '../constants';

interface EventContextType {
  events: Event[];
  tickets: Ticket[];
  getEventById: (id: string) => Event | undefined;
  getTicketsByUserId: (userId: string) => Ticket[];
  getAttendeesByEventId: (eventId: string) => Attendee[];
  bookTicket: (eventId: string, user: User, quantity: number) => Promise<{success: boolean; message: string; newTickets: Ticket[]}>;
  addEvent: (event: Omit<Event, 'id' | 'ticketsSold'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const getEventById = useCallback((id: string) => events.find(event => event.id === id), [events]);
  
  const getTicketsByUserId = useCallback((userId: string) => tickets.filter(ticket => ticket.userId === userId), [tickets]);

  const getAttendeesByEventId = useCallback((eventId: string) => {
    return tickets
      .filter(ticket => ticket.eventId === eventId)
      .map(ticket => ({
        userId: ticket.userId,
        name: ticket.userName,
        email: ticket.userEmail,
      }));
  }, [tickets]);

  const bookTicket = useCallback(async (eventId: string, user: User, quantity: number) => {
    return new Promise<{success: boolean; message: string; newTickets: Ticket[]}>((resolve) => {
      setTimeout(() => { // Simulate API call
        setEvents(prevEvents => {
          const eventIndex = prevEvents.findIndex(e => e.id === eventId);
          if (eventIndex === -1) {
            resolve({ success: false, message: 'Event not found.', newTickets: [] });
            return prevEvents;
          }
          
          const event = prevEvents[eventIndex];
          const ticketsAvailable = event.totalTickets - event.ticketsSold;
          
          if (quantity > ticketsAvailable) {
            resolve({ success: false, message: 'Not enough tickets available.', newTickets: [] });
            return prevEvents;
          }

          const updatedEvent = {
            ...event,
            ticketsSold: event.ticketsSold + quantity,
          };

          const newEvents = [...prevEvents];
          newEvents[eventIndex] = updatedEvent;

          const newTickets: Ticket[] = [];
          for (let i = 0; i < quantity; i++) {
            newTickets.push({
              id: `ticket_${Date.now()}_${Math.random().toString(36).substring(2, 9)}_${i}`,
              eventId: eventId,
              userId: user.id,
              userName: user.name,
              userEmail: user.email,
              purchaseDate: new Date().toISOString(),
            });
          }
          
          setTickets(prevTickets => [...prevTickets, ...newTickets]);
          resolve({ success: true, message: 'Booking successful!', newTickets });
          return newEvents;
        });
      }, 500); // 500ms delay
    });
  }, []);

  const addEvent = (eventData: Omit<Event, 'id' | 'ticketsSold'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      ticketsSold: 0,
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };
  
  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return (
    <EventContext.Provider value={{ events, tickets, getEventById, getTicketsByUserId, getAttendeesByEventId, bookTicket, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

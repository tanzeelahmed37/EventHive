
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import TicketBookingForm from '../components/TicketBookingForm';
import { CalendarIcon, LocationMarkerIcon, TicketIcon as TicketIconSolid } from '../components/icons';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();
  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The event you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition-colors">
          Back to Events
        </Link>
      </div>
    );
  }
  
  const ticketsAvailable = event.totalTickets - event.ticketsSold;
  const progress = (event.ticketsSold / event.totalTickets) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <img className="w-full h-64 md:h-96 object-cover" src={event.imageUrl} alt={event.title} />
        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary-500" />
                  <span>{new Date(event.date).toUTCString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LocationMarkerIcon className="w-5 h-5 text-primary-500" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-200">
                <p>{event.description}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Tickets Status</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div 
                        className="bg-primary-600 h-4 rounded-full" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>{event.ticketsSold}</strong> sold out of <strong>{event.totalTickets}</strong> ({ticketsAvailable} left)
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <TicketBookingForm event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;

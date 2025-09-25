
import React from 'react';
import { Link } from 'react-router-dom';
import type { Event } from '../types';
import { CalendarIcon, LocationMarkerIcon, TicketIcon as TicketIconSolid } from './icons';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { id, title, date, location, imageUrl, totalTickets, ticketsSold } = event;
  const ticketsAvailable = totalTickets - ticketsSold;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link to={`/event/${id}`} className="block">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          <Link to={`/event/${id}`} className="hover:text-primary-500 transition-colors">{title}</Link>
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <CalendarIcon className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <LocationMarkerIcon className="w-4 h-4" />
          <span>{location}</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
           <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
              <TicketIconSolid className="w-5 h-5" />
              <span>{ticketsAvailable > 0 ? `${ticketsAvailable} tickets left` : 'Sold Out'}</span>
            </div>
            <Link 
              to={`/event/${id}`} 
              className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors text-xs font-bold"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

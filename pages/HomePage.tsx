
import React from 'react';
import EventCard from '../components/EventCard';
import { useEvents } from '../contexts/EventContext';

const HomePage: React.FC = () => {
  const { events } = useEvents();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Upcoming Events</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Discover and book tickets for the most exciting events.</p>
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">No events found.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;

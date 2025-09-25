
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import QRCodeTicket from '../components/QRCodeTicket';
import { Link } from 'react-router-dom';

const MyTicketsPage: React.FC = () => {
  const { user } = useAuth();
  const { getTicketsByUserId, getEventById } = useEvents();
  
  if (!user) {
    return <div>Loading user data...</div>;
  }

  const userTickets = getTicketsByUserId(user.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
      {userTickets.length > 0 ? (
        <div className="space-y-6">
          {userTickets.map(ticket => {
            const event = getEventById(ticket.eventId);
            if (!event) return null;
            return <QRCodeTicket key={ticket.id} ticket={ticket} event={event} />;
          })}
        </div>
      ) : (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">No tickets yet!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't booked any tickets. Explore our events to find your next experience.</p>
          <Link to="/" className="inline-block bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition-colors">
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;

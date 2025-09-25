
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import type { Event, Ticket } from '../types';
import Spinner from './Spinner';
import Modal from './Modal';
import QRCodeTicket from './QRCodeTicket';

interface TicketBookingFormProps {
  event: Event;
}

const TicketBookingForm: React.FC<TicketBookingFormProps> = ({ event }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookedTickets, setBookedTickets] = useState<Ticket[]>([]);

  const { isAuthenticated, user, signIn } = useAuth();
  const { bookTicket } = useEvents();

  const ticketsAvailable = event.totalTickets - event.ticketsSold;

  const handleBooking = async () => {
    if (!isAuthenticated || !user) {
      setError("Please log in to book tickets.");
      return;
    }
    if (quantity <= 0) {
      setError("Please select at least one ticket.");
      return;
    }
    if (quantity > ticketsAvailable) {
      setError("Not enough tickets available.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const result = await bookTicket(event.id, user, quantity);
    setIsLoading(false);
    
    if (result.success) {
      setBookedTickets(result.newTickets);
      setShowConfirmation(true);
    } else {
      setError(result.message);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
    setBookedTickets([]);
  }

  if (ticketsAvailable <= 0) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 rounded-md">
        <p className="font-bold">Sold Out!</p>
        <p>Unfortunately, there are no more tickets available for this event.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-4">Book Your Tickets</h3>
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="quantity" className="font-semibold">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max={ticketsAvailable}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          disabled={!isAuthenticated || isLoading}
        />
      </div>
      
      {isAuthenticated ? (
        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center disabled:bg-primary-300"
        >
          {isLoading ? <Spinner /> : `Book ${quantity} Ticket${quantity > 1 ? 's' : ''}`}
        </button>
      ) : (
        <div className="text-center">
            <p className="mb-4">You must be logged in to book tickets.</p>
            <button
            onClick={() => signIn('user')}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
            Login to Book
            </button>
        </div>
      )}
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <Modal isOpen={showConfirmation} onClose={handleCloseModal}>
         <div className="p-4">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Successful!</h2>
            <p className="mb-6">Your QR code tickets are ready. You can also find them on your "My Tickets" page.</p>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {bookedTickets.map(ticket => (
                <QRCodeTicket key={ticket.id} ticket={ticket} event={event} />
              ))}
            </div>
             <button
              onClick={handleCloseModal}
              className="mt-6 w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Close
            </button>
         </div>
      </Modal>
    </div>
  );
};

export default TicketBookingForm;

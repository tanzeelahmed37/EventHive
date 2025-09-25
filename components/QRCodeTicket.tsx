
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Ticket, Event } from '../types';

interface QRCodeTicketProps {
  ticket: Ticket;
  event: Event;
}

const QRCodeTicket: React.FC<QRCodeTicketProps> = ({ ticket, event }) => {
  const qrCodeValue = JSON.stringify({
    ticketId: ticket.id,
    eventId: event.id,
    eventName: event.title,
    userId: ticket.userId,
    userName: ticket.userName,
    purchaseDate: ticket.purchaseDate,
  });
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row items-center gap-6">
      <div className="p-2 bg-white rounded-md">
         <QRCodeSVG value={qrCodeValue} size={128} level="H" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{event.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">Ticket Holder: <strong>{ticket.userName}</strong></p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{formattedDate}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{event.location}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">ID: {ticket.id}</p>
      </div>
    </div>
  );
};

export default QRCodeTicket;
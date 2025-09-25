
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import type { Event } from '../types';
import Modal from '../components/Modal';

const EventForm: React.FC<{ event?: Event; onSave: (event: Omit<Event, 'id' | 'ticketsSold'> | Event) => void; onCancel: () => void }> = ({ event, onSave, onCancel }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [date, setDate] = useState(event?.date ? event.date.substring(0, 16) : '');
    const [location, setLocation] = useState(event?.location || '');
    const [totalTickets, setTotalTickets] = useState(event?.totalTickets || 100);
    const [imageUrl, setImageUrl] = useState(event?.imageUrl || 'https://picsum.photos/seed/newevent/800/600');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!user) return;
        const eventData = {
            title, description, date, location, totalTickets, imageUrl, organizerId: user.id
        };
        
        if (event) {
            onSave({ ...event, ...eventData });
        } else {
            onSave(eventData);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm"/>
            </div>
             <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm"/>
            </div>
             <div>
                <label className="block text-sm font-medium">Date and Time</label>
                <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm"/>
            </div>
             <div>
                <label className="block text-sm font-medium">Location</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm"/>
            </div>
            <div>
                <label className="block text-sm font-medium">Total Tickets</label>
                <input type="number" min="1" value={totalTickets} onChange={e => setTotalTickets(Number(e.target.value))} required className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm"/>
            </div>
             <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Save Event</button>
            </div>
        </form>
    );
};

const OrganizerDashboard: React.FC = () => {
    const { user } = useAuth();
    const { events, getAttendeesByEventId, addEvent, updateEvent, deleteEvent } = useEvents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);
    
    const organizerEvents = events.filter(event => event.organizerId === user?.id);

    const handleSaveEvent = (eventData: Omit<Event, 'id' | 'ticketsSold'> | Event) => {
        if ('id' in eventData) {
            updateEvent(eventData as Event);
        } else {
            addEvent(eventData as Omit<Event, 'id' | 'ticketsSold'>);
        }
        setIsModalOpen(false);
        setEditingEvent(undefined);
    };
    
    const openCreateModal = () => {
        setEditingEvent(undefined);
        setIsModalOpen(true);
    };
    
    const openEditModal = (event: Event) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const handleExportCSV = (event: Event) => {
        const attendees = getAttendeesByEventId(event.id);
        if (attendees.length === 0) {
            alert('No attendees to export.');
            return;
        }
        const headers = ['UserID', 'Name', 'Email'];
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + attendees.map(a => `${a.userId},${a.name},${a.email}`).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${event.title.replace(/\s+/g, '_')}_attendees.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
                <button onClick={openCreateModal} className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                    Create New Event
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">My Events</h2>
                <div className="space-y-4">
                    {organizerEvents.map(event => {
                        const attendeesCount = getAttendeesByEventId(event.id).length;
                        return (
                            <div key={event.id} className="p-4 border dark:border-gray-700 rounded-lg flex flex-col md:flex-row justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">{event.title}</h3>
                                    <p className="text-sm text-gray-500">{event.location} - {new Date(event.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Sold: {event.ticketsSold}/{event.totalTickets} | Attendees: {attendeesCount}
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <button onClick={() => handleExportCSV(event)} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">Export CSV</button>
                                    <button onClick={() => openEditModal(event)} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">Edit</button>
                                    <button onClick={() => window.confirm('Are you sure you want to delete this event?') && deleteEvent(event.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Delete</button>
                                </div>
                            </div>
                        );
                    })}
                    {organizerEvents.length === 0 && <p>You have not created any events yet.</p>}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
                <EventForm 
                    event={editingEvent}
                    onSave={handleSaveEvent}
                    onCancel={() => { setIsModalOpen(false); setEditingEvent(undefined); }}
                />
            </Modal>
        </div>
    );
};

export default OrganizerDashboard;


import type { Event } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 'evt_1',
    title: 'React Conference 2024',
    description: 'The biggest React conference of the year, featuring talks from the core team and industry experts. An event you cannot miss!',
    date: '2024-10-26T09:00:00Z',
    location: 'San Francisco, CA',
    totalTickets: 500,
    ticketsSold: 245,
    imageUrl: 'https://picsum.photos/seed/reactconf/800/600',
    organizerId: 'org_1bC8dF2zYgX7eA6v5uT4rS3q2',
  },
  {
    id: 'evt_2',
    title: 'VueJS Forge',
    description: 'A deep-dive into the Vue ecosystem. Workshops, live coding sessions, and networking opportunities with fellow Vue developers.',
    date: '2024-11-15T10:00:00Z',
    location: 'Amsterdam, Netherlands',
    totalTickets: 300,
    ticketsSold: 150,
    imageUrl: 'https://picsum.photos/seed/vueforge/800/600',
    organizerId: 'org_1bC8dF2zYgX7eA6v5uT4rS3q2',
  },
  {
    id: 'evt_3',
    title: 'Design Systems Summit',
    description: 'Explore the latest trends in design systems. Learn how to build, scale, and maintain a successful design system for your organization.',
    date: '2024-09-05T08:30:00Z',
    location: 'Virtual Event',
    totalTickets: 1000,
    ticketsSold: 890,
    imageUrl: 'https://picsum.photos/seed/designsummit/800/600',
    organizerId: 'org_1bC8dF2zYgX7eA6v5uT4rS3q2',
  },
    {
    id: 'evt_4',
    title: 'AI in Practice',
    description: 'A practical look at implementing AI and machine learning in your business. Case studies, expert panels, and hands-on labs.',
    date: '2024-12-02T09:00:00Z',
    location: 'London, UK',
    totalTickets: 250,
    ticketsSold: 75,
    imageUrl: 'https://picsum.photos/seed/aipractice/800/600',
    organizerId: 'org_1bC8dF2zYgX7eA6v5uT4rS3q2',
  },
];


import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import MyTicketsPage from './pages/MyTicketsPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <HashRouter>
            <div className="min-h-screen font-sans text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/event/:id" element={<EventDetailPage />} />
                  <Route 
                    path="/my-tickets" 
                    element={
                      <ProtectedRoute roles={['user']}>
                        <MyTicketsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard/*" 
                    element={
                      <ProtectedRoute roles={['organizer']}>
                        <OrganizerDashboard />
                      </ProtectedRoute>
                    } 
                  />
                   <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </HashRouter>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
// FIX: Removed unused and non-existent 'LoginIcon' import.
import { SunIcon, MoonIcon, TicketIcon, UserCircleIcon, CogIcon, LogoutIcon } from './icons';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, signIn, signOut } = useAuth();

  const activeLinkStyle = {
    color: '#3b82f6', // primary-500
    textDecoration: 'underline',
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600 dark:text-primary-400">
          <TicketIcon className="w-8 h-8" />
          <span>EventHive</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            Events
          </NavLink>
          {isAuthenticated && user?.role === 'user' && (
            <NavLink to="/my-tickets" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
              My Tickets
            </NavLink>
          )}
          {isAuthenticated && user?.role === 'organizer' && (
            <NavLink to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
              Dashboard
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="font-medium hidden sm:inline">{user?.name}</span>
              <button onClick={signOut} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                <LogoutIcon className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
               <button onClick={() => signIn('user')} className="flex items-center gap-2 bg-primary-500 text-white px-3 py-2 rounded-md hover:bg-primary-600 transition-colors">
                <UserCircleIcon className="w-5 h-5" />
                <span className="hidden md:inline">Login as User</span>
              </button>
              <button onClick={() => signIn('organizer')} className="flex items-center gap-2 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
                <CogIcon className="w-5 h-5" />
                 <span className="hidden md:inline">Login as Organizer</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
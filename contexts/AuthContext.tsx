
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (role: Role) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<Role, User> = {
  user: {
    id: 'user_2fA9xJ1yZbQ8cE7b6aF5gH4d3',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
  },
  organizer: {
    id: 'org_1bC8dF2zYgX7eA6v5uT4rS3q2',
    name: 'Event Organizers Inc.',
    email: 'contact@eventorg.com',
    role: 'organizer',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (role: Role) => {
    setUser(mockUsers[role]);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

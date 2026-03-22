import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  role: 'Admin' | 'Dispatcher' | 'Technician' | 'Customer' | null;
  company: string | null;
}

interface AuthContextType {
  user: User;
  impersonate: (role: User['role'], company: string) => void;
  clearImpersonation: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ role: null, company: null });

  const impersonate = (role: User['role'], company: string) => {
    setUser({ role, company });
  };

  const clearImpersonation = () => {
    setUser({ role: null, company: null });
  };

  return (
    <AuthContext.Provider value={{ user, impersonate, clearImpersonation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

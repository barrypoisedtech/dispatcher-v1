import React, { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-container min-h-screen bg-transparent">
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

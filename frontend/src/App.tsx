import React from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { SignUpPage } from './pages/auth/SignUpPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { RoleSwitcher } from './pages/auth/RoleSwitcher';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout>
      {user.role === 'Admin' ? <AdminDashboard /> : <SignUpPage />}
      <RoleSwitcher />
    </AppLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

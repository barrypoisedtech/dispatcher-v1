import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const RoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { impersonate, clearImpersonation, user } = useAuth();

  const handleImpersonate = (role: 'Admin' | 'Dispatcher' | 'Technician' | 'Customer', company: string) => {
    impersonate(role, company);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button 
        style={{ 
          position: 'fixed', bottom: 20, right: 20, zIndex: 1000, 
          borderRadius: 20, padding: '8px 16px', 
          background: user.role ? '#10b981' : '#121212', 
          color: '#fff', border: '1px solid rgba(255,255,255,0.2)', 
          cursor: 'pointer', fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
        onClick={() => setIsOpen(true)}
      >
        {user.role ? `👤 ${user.role}` : '🛠 PoC Override'}
      </button>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20, backdropFilter: 'blur(4px)' }}>
      <GlassCard style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
        <button 
          style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: 18 }}
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Development Role Switcher</h3>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Select a persona to immediately impersonate their view and bypass OAuth during development.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="outline" onClick={() => handleImpersonate('Admin', 'Arctic HVAC')}>Admin (Arctic HVAC)</Button>
          <Button variant="outline" onClick={() => handleImpersonate('Dispatcher', 'Brothers Plumbing')}>Dispatcher (Brothers Plumbing)</Button>
          <Button variant="outline" onClick={() => handleImpersonate('Technician', 'Tech1')}>Technician (Tech1)</Button>
          <Button variant="outline" onClick={() => handleImpersonate('Customer', 'Cust1')}>Customer (Cust1)</Button>
          
          {user.role && (
            <Button variant="outline" style={{ border: '1px solid #ef4444', color: '#ef4444' }} onClick={() => { clearImpersonation(); setIsOpen(false); }}>
              Clear Impersonation
            </Button>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

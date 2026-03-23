import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const TopNav: React.FC = () => {
  const { user, clearImpersonation } = useAuth();

  return (
    <nav className="top-nav glass-panel" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 24px', 
      height: '64px',
      marginBottom: '24px',
      borderRadius: '0 0 16px 16px',
      borderTop: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: '#fff' }}>
          Dispatcher <span style={{ color: '#10b981' }}>PRO</span>
        </span>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <NavLink label="Work Specs" />
          <NavLink label="Technicians" />
          <NavLink label="Skills" />
          <NavLink label="Tools" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Admin User</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>{user.company || 'System'}</div>
          </div>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: '#fff',
            fontSize: '14px'
          }}>
            A
          </div>
        </div>
        
        <button 
          onClick={clearImpersonation}
          style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            color: '#eee', 
            padding: '8px 16px', 
            borderRadius: '8px', 
            fontSize: '13px', 
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = '#eee';
          }}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ label: string }> = ({ label }) => (
  <a href="#" style={{ 
    color: '#aaa', 
    textDecoration: 'none', 
    fontSize: '14px', 
    fontWeight: 500,
    transition: 'color 0.2s ease'
  }} 
  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
  onMouseOut={(e) => (e.currentTarget.style.color = '#aaa')}
  >
    {label}
  </a>
);

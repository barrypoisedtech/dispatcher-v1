import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();

  return (
    <div className="signup-layout">
      {/* Left Column: Branding / Marketing */}
      <div className="signup-brand">
        <div className="brand-content">
          <h1 className="brand-title">Dispatcher PRO</h1>
          <p className="brand-subtitle">The modern operating system for field service teams.</p>
          
          {user.role && (
            <div style={{ marginTop: 40, padding: 20, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 12 }}>
              <span style={{ color: '#10b981', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>POC Mode Active</span>
              <h3 style={{ margin: '8px 0 4px 0', color: '#fff' }}>Impersonating {user.role}</h3>
              <p style={{ margin: 0, color: '#aaa', fontSize: 14 }}>Company: {user.company}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="signup-form-container">
        <GlassCard className="form-card">
          <h2 className="form-header">Create your account</h2>
          <p className="form-subtext">Join thousands of businesses managing their fleets efficiently.</p>
          
          <form onSubmit={(e) => e.preventDefault()} className="auth-form">
            <Input 
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            <Button fullWidth type="submit" className="mt-4">
              Get Started
            </Button>
            
            <div className="divider">or continue with</div>
            
            <div className="oauth-buttons">
              <Button variant="outline" fullWidth>Google</Button>
              <Button variant="outline" fullWidth>Apple</Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

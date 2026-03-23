import React from 'react';
import { TopNav } from '../../components/layout/TopNav';
import { GanttChart } from '../../components/ui/GanttChart';
import { GlassCard } from '../../components/ui/GlassCard';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard fade-in" style={{ padding: '0 24px 24px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      <TopNav />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Header Stats / Quick Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          <StatCard label="Active Jobs" value="12" sub="4 starting soon" color="#3b82f6" />
          <StatCard label="Available Techs" value="8/12" sub="In the field" color="#10b981" />
          <StatCard label="Alerts" value="2" sub="Unassigned orders" color="#ef4444" />
          <StatCard label="Completed" value="45" sub="Today" color="#8b5cf6" />
        </div>

        {/* Schedule View */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>Dispatch Schedule</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>Today</button>
              <button style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>Timeline View</button>
            </div>
          </div>
          <GanttChart />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, sub: string, color: string }> = ({ label, value, sub, color }) => (
  <GlassCard style={{ padding: '20px' }}>
    <div style={{ fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '12px', color, fontWeight: 500 }}>{sub}</div>
  </GlassCard>
);

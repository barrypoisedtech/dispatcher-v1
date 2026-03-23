import React from 'react';
import { GlassCard } from './GlassCard';

interface Assignment {
  id: string;
  technicianId: string;
  title: string;
  startTime: string; // "HH:mm"
  durationHours: number;
  color: string;
}

interface Technician {
  id: string;
  name: string;
  avatar: string;
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM (12 hours)

export const GanttChart: React.FC = () => {
  // Mock data for initial PoC
  const technicians: Technician[] = [
    { id: '1', name: 'Alex Rivera', avatar: 'AR' },
    { id: '2', name: 'Sarah Chen', avatar: 'SC' },
    { id: '3', name: 'Jordan Smyth', avatar: 'JS' },
    { id: '4', name: 'Marcus Bell', avatar: 'MB' },
  ];

  const assignments: Assignment[] = [
    { id: 'a1', technicianId: '1', title: 'HVAC Repair', startTime: '08:00', durationHours: 2, color: '#3b82f6' },
    { id: 'a2', technicianId: '1', title: 'Maintenance', startTime: '11:00', durationHours: 1.5, color: '#10b981' },
    { id: 'a3', technicianId: '2', title: 'Pipe Burst', startTime: '07:30', durationHours: 3, color: '#ef4444' },
    { id: 'a4', technicianId: '2', title: 'Consultation', startTime: '13:00', durationHours: 1, color: '#8b5cf6' },
    { id: 'a5', technicianId: '3', title: 'Wiring Job', startTime: '09:00', durationHours: 4, color: '#f59e0b' },
    { id: 'a6', technicianId: '4', title: 'Unit Install', startTime: '10:30', durationHours: 5, color: '#ec4899' },
  ];

  const getPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 7) * 60 + minutes;
    return (totalMinutes / (12 * 60)) * 100;
  };

  const getWidth = (hours: number) => {
    return (hours / 12) * 100;
  };

  return (
    <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Time Header */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ width: '200px', padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '13px', color: '#888' }}>
            TECHNICIANS
          </div>
          <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
            {HOURS.map((hour) => (
              <div key={hour} style={{ 
                flex: 1, 
                textAlign: 'center', 
                padding: '16px 0', 
                fontSize: '11px', 
                color: '#666', 
                fontWeight: 700,
                borderRight: hour === 19 ? 'none' : '1px solid rgba(255,255,255,0.05)'
              }}>
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {technicians.map((tech) => (
          <div key={tech.id} style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)', minHeight: '80px' }}>
            {/* Tech Info */}
            <div style={{ width: '200px', padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff' 
              }}>
                {tech.avatar}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#eee' }}>{tech.name}</span>
            </div>

            {/* Timeline Row */}
            <div style={{ flex: 1, position: 'relative', background: 'rgba(255,255,255,0.01)' }}>
              {/* Vertical Grid Lines */}
              {HOURS.map((hour) => (
                <div key={hour} style={{ 
                  position: 'absolute', 
                  top: 0, bottom: 0, 
                  left: `${((hour - 7) / 12) * 100}%`, 
                  width: '1px', 
                  background: 'rgba(255,255,255,0.03)' 
                }} />
              ))}

              {/* Assignment Blocks */}
              {assignments.filter(a => a.technicianId === tech.id).map((assignment) => (
                <div 
                  key={assignment.id}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    bottom: '12px',
                    left: `${getPosition(assignment.startTime)}%`,
                    width: `${getWidth(assignment.durationHours)}%`,
                    background: assignment.color,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#fff',
                    boxShadow: `0 4px 12px ${assignment.color}44`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    zIndex: 2
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{assignment.title}</div>
                  <div style={{ opacity: 0.8, fontSize: '9px' }}>{assignment.startTime} • {assignment.durationHours}h</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

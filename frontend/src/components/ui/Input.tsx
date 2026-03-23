import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`input-group ${className}`}>
      <input id={inputId} className="input-field" placeholder=" " {...props} />
      <label htmlFor={inputId} className="input-label">{label}</label>
    </div>
  );
};

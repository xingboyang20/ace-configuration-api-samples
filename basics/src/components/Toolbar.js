import React from 'react';
import './Toolbar.css';

export function ToobarButton({ children, onClick }) {
  return (
    <button className="toolbar-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function Toolbar({ children }) {
  return <div className="toolbar">{children}</div>;
}

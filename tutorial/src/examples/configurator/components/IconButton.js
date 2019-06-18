import React from 'react';
import './IconButton.css';

const IconButton = ({ title, children, onClick }) => (
  <button
    style={{ padding: '5px 0 0 4px' }}
    className="icon-button"
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
);

export default IconButton;

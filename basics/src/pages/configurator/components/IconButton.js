import React from 'react';
import './IconButton.css';

/**
 * A button that is rendered as icon.
 *
 * You must provide the icon as `children`
 */
function IconButton({ title, children, onClick }) {
  return (
    <button
      style={{ padding: '5px 0 0 4px' }}
      className="icon-button"
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;

import React from 'react';
import './Page.css';

/**
 * Provide consistent styling for a page
 */
const Page = ({ variant = 'normal', children }) => (
  <div className={`page page-${variant}`}>{children}</div>
);

export default Page;
